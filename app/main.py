from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.payment import router as payment_router
import os

# Tentar importar configurações do PythonAnywhere
try:
    from pythonanywhere_config import CORS_ORIGINS
except ImportError:
    CORS_ORIGINS = [
        "https://annapratadiadasmaes.store",
        "https://www.annapratadiadasmaes.store"
    ]

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar as rotas
app.include_router(payment_router, prefix="/api", tags=["payment"])

@app.get("/")
async def root():
    return {"status": "ok", "message": "API está funcionando"}

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "api_key_configured": bool(os.getenv('CHARGE_API_KEY')),
        "environment": os.getenv('ENVIRONMENT', 'production')
    } 