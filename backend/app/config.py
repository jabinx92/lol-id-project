from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    riot_api_key: str
    allowed_origins: str = "http://localhost:5173"
    cache_ttl_seconds: int = 120

    model_config = SettingsConfigDict(env_file=(".env.local", "backend/.env"), extra="ignore")

    @property
    def origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]

