# Configurações do PythonAnywhere
import os

# Credenciais PythonAnywhere
PYTHONANYWHERE_USERNAME = 'myrnaclyde'
PYTHONANYWHERE_TOKEN = '46bdae2a099a7bf061aeebc0cc5fb6410dee0a59'

# Configurar variáveis de ambiente
os.environ['ENVIRONMENT'] = 'production'
os.environ['CHARGE_API_KEY'] = 'sua_chave_api_aqui'  # Substitua pela sua chave API

# Configurar CORS
CORS_ORIGINS = [
    "https://annapratadiadasmaes.store",
    "https://www.annapratadiadasmaes.store",
    "https://myrnaclyde.pythonanywhere.com"  # Adicionando o domínio do PythonAnywhere
] 