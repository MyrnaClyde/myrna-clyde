# Configurações do PythonAnywhere
import os

# Configurar variáveis de ambiente
os.environ['ENVIRONMENT'] = 'production'
os.environ['CHARGE_API_KEY'] = 'sua_chave_api_aqui'  # Substitua pela sua chave API

# Configurar CORS
CORS_ORIGINS = [
    "https://annapratadiadasmaes.store",
    "https://www.annapratadiadasmaes.store"
] 