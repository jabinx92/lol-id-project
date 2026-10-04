import os

os.environ.setdefault("RIOT_API_KEY", "test-key")

from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "rift-scout-api"}


def test_player_requires_game_name() -> None:
    response = client.get("/api/player", params={"tagLine": "4101", "platform": "kr"})
    assert response.status_code == 422

