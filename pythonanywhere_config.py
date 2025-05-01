# Configurações do PythonAnywhere
import os

# Credenciais PythonAnywhere
PYTHONANYWHERE_USERNAME = 'myrnaclyde'
PYTHONANYWHERE_TOKEN = '46bdae2a099a7bf061aeebc0cc5fb6410dee0a59'

# Configurar variáveis de ambiente
os.environ['ENVIRONMENT'] = 'production'
os.environ['CHARGE_API_KEY'] = 'sk_live_Wp+neIMpd7mPA0wCIKgQ/mWOV7k98RP8VYDpKDqnfTYjVW/a0akc3jOHQsnHEEw2v1UlB9IxTEw9uEMyTi8bEch99EWtZUGnFrS8StR+2grctBrpz0bRl3KycNWQfygtfJx0zbWaYjPBhy1HmgR5UaiWsA0QBGrg3e3hMG1yGzQ='  # Substitua pela sua chave API

# Configurar CORS
CORS_ORIGINS = [
    "https://annapratadiadasmaes.store",
    "https://www.annapratadiadasmaes.store",
    "https://myrnaclyde.pythonanywhere.com"  # Adicionando o domínio do PythonAnywhere
] 