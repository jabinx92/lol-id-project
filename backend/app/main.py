from functools import lru_cache

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from .config import Settings, get_settings
from .models import PlayerProfile
from .riot import RiotApiError, RiotClient

app = FastAPI(
    title="Rift Scout API",
    description="Transforms Riot Games data into a concise League player profile.",
    version="1.0.0",
)

settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@lru_cache
def get_riot_client() -> RiotClient:
    return RiotClient(settings.riot_api_key, settings.cache_ttl_seconds)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "rift-scout-api"}


@app.get("/api/player", response_model=PlayerProfile)
async def player(
    gameName: str = Query(min_length=1, max_length=64),
    tagLine: str = Query(min_length=1, max_length=16),
    platform: str = Query(default="na1", min_length=2, max_length=5),
    riot: RiotClient = Depends(get_riot_client),
) -> PlayerProfile:
    try:
        return await riot.player(gameName, tagLine, platform)
    except RiotApiError as error:
        raise HTTPException(status_code=error.status_code, detail=str(error)) from error

