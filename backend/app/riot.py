import asyncio
from collections import defaultdict
from time import monotonic
from typing import Any
from urllib.parse import quote

import httpx

from .models import Champion, PlayerProfile, Rank, RecentForm

PLATFORM_TO_REGION = {
    "na1": "americas", "br1": "americas", "la1": "americas", "la2": "americas",
    "oc1": "sea", "euw1": "europe", "eun1": "europe", "tr1": "europe",
    "ru": "europe", "kr": "asia", "jp1": "asia",
}


class RiotApiError(Exception):
    def __init__(self, status_code: int, message: str) -> None:
        super().__init__(message)
        self.status_code = status_code


class RiotClient:
    def __init__(self, api_key: str, cache_ttl: int = 120) -> None:
        self.api_key = api_key
        self.cache_ttl = cache_ttl
        self._cache: dict[str, tuple[float, PlayerProfile]] = {}

    async def _get(self, client: httpx.AsyncClient, url: str) -> Any:
        response = await client.get(url, headers={"X-Riot-Token": self.api_key})
        if response.status_code == 404:
            raise RiotApiError(404, "Player not found. Check the Riot ID, tag, and region.")
        if response.status_code == 429:
            raise RiotApiError(429, "Riot's rate limit was reached. Please try again shortly.")
        if response.status_code in (401, 403):
            raise RiotApiError(503, "The Riot API key is unavailable or expired.")
        if response.is_error:
            raise RiotApiError(502, f"Riot API returned {response.status_code}.")
        return response.json()

    async def player(self, game_name: str, tag_line: str, platform: str) -> PlayerProfile:
        platform = platform.lower()
        region = PLATFORM_TO_REGION.get(platform)
        if not region:
            raise RiotApiError(400, "That region is not supported.")
        cache_key = f"{game_name.casefold()}#{tag_line.casefold()}:{platform}"
        cached = self._cache.get(cache_key)
        if cached and cached[0] > monotonic():
            return cached[1]

        async with httpx.AsyncClient(timeout=15) as client:
            account = await self._get(
                client,
                f"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
                f"{quote(game_name, safe='')}/{quote(tag_line, safe='')}",
            )
            puuid = account["puuid"]
            summoner, ranks, mastery, versions, match_ids = await asyncio.gather(
                self._get(client, f"https://{platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"),
                self._get(client, f"https://{platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}"),
                self._get(client, f"https://{platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top?count=8"),
                client.get("https://ddragon.leagueoflegends.com/api/versions.json"),
                self._get(client, f"https://{region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10"),
            )
            version = versions.json()[0]
            champion_response, *matches = await asyncio.gather(
                client.get(f"https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json"),
                *(self._get(client, f"https://{region}.api.riotgames.com/lol/match/v5/matches/{match_id}") for match_id in match_ids),
            )

        champion_map = {int(value["key"]): value for value in champion_response.json()["data"].values()}
        participants = [
            participant
            for match in matches
            for participant in match["info"]["participants"]
            if participant["puuid"] == puuid
        ]
        recent_by_champion: dict[int, dict[str, int]] = defaultdict(lambda: {"games": 0, "wins": 0})
        for participant in participants:
            stats = recent_by_champion[participant["championId"]]
            stats["games"] += 1
            stats["wins"] += int(participant["win"])

        wins = sum(int(participant["win"]) for participant in participants)
        kda = sum(
            (participant["kills"] + participant["assists"]) / max(1, participant["deaths"])
            for participant in participants
        ) / max(1, len(participants))
        solo = next((rank for rank in ranks if rank["queueType"] == "RANKED_SOLO_5x5"), ranks[0] if ranks else None)
        profile = PlayerProfile(
            gameName=account["gameName"], tagLine=account["tagLine"], platform=platform,
            level=summoner["summonerLevel"], profileIconId=summoner["profileIconId"],
            rank=Rank(tier=solo["tier"], division=solo["rank"], leaguePoints=solo["leaguePoints"], wins=solo["wins"], losses=solo["losses"]) if solo else None,
            recent=RecentForm(wins=wins, losses=len(participants) - wins, kda=kda, games=len(participants)),
            champions=[
                Champion(
                    id=item["championId"], name=champion_map.get(item["championId"], {}).get("name", f"Champion {item['championId']}"),
                    slug=champion_map.get(item["championId"], {}).get("id", "Aatrox"), masteryLevel=item["championLevel"],
                    masteryPoints=item["championPoints"], **recent_by_champion[item["championId"]],
                )
                for item in mastery[:5]
            ],
        )
        self._cache[cache_key] = (monotonic() + self.cache_ttl, profile)
        return profile

