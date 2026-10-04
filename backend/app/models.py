from pydantic import BaseModel, Field


class Rank(BaseModel):
    tier: str
    division: str
    leaguePoints: int
    wins: int
    losses: int


class RecentForm(BaseModel):
    wins: int
    losses: int
    kda: float
    games: int


class Champion(BaseModel):
    id: int
    name: str
    slug: str
    masteryLevel: int
    masteryPoints: int
    games: int = 0
    wins: int = 0


class PlayerProfile(BaseModel):
    demo: bool = False
    gameName: str
    tagLine: str
    platform: str
    level: int
    profileIconId: int
    rank: Rank | None
    recent: RecentForm
    champions: list[Champion] = Field(default_factory=list)

