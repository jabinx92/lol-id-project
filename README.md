# Rift Scout

Rift Scout is a League of Legends player analytics app. It combines a polished React/TypeScript interface with a Python FastAPI data service that retrieves and transforms Riot Games API data.

## Architecture

```text
React + TypeScript frontend
          |
Next-compatible web API proxy
          |
Python FastAPI service
          |
Riot Account, League, Mastery, Match V5, and Data Dragon APIs
```

The web API retains its original Riot integration as a safe fallback until the Python service is deployed. Once `PYTHON_API_BASE_URL` is configured, requests are forwarded to FastAPI automatically.

## Features

- Riot ID and regional player search
- Ranked tier, LP, wins, losses, and win rate
- Recent-match KDA and form
- Champion mastery and recent champion records
- Server-side API-key protection
- Python request validation, short-lived caching, and typed response models
- FastAPI interactive documentation at `/docs`
- Responsive public website

## Local development

### Web app

```powershell
pnpm install
pnpm run dev
```

### Python API

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r backend\requirements-dev.txt
.venv\Scripts\python -m uvicorn backend.app.main:app --reload --port 8000
```

Copy the documented variables from `.env.example` and `backend/.env.example`. Never commit a Riot API key.

Run Python tests with:

```powershell
.venv\Scripts\python -m pytest backend\tests
```

## Deployment

The frontend is deployed with Sites. The FastAPI directory includes a Dockerfile and can be deployed to a Python/Docker host. After deploying it, configure `PYTHON_API_BASE_URL` on the frontend and keep `RIOT_API_KEY` only on the Python host.

Rift Scout is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
