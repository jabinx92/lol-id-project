# Rift Scout Python API

FastAPI service that retrieves Riot account, ranked, champion mastery, and Match V5 data and returns the exact profile shape consumed by the Rift Scout frontend.

## Run locally

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r backend\requirements-dev.txt
$env:RIOT_API_KEY = "your-key"
.venv\Scripts\python -m uvicorn backend.app.main:app --reload --port 8000
```

Open `http://127.0.0.1:8000/docs` for FastAPI's interactive API documentation.

## Deploy

Deploy the `backend` directory to any Docker-compatible Python host. Configure `RIOT_API_KEY`, `ALLOWED_ORIGINS`, and optionally `CACHE_TTL_SECONDS`. Then set `PYTHON_API_BASE_URL` on the Rift Scout web deployment to the service origin.

