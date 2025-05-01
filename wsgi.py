import sys
import os

# Adicionar o diretório do projeto ao PYTHONPATH
path = '/home/myrnaclyde/myrna'
if path not in sys.path:
    sys.path.append(path)

# Configurar variáveis de ambiente
os.environ['ENVIRONMENT'] = 'production'
os.environ['CHARGE_API_KEY'] = 'sua_chave_api_aqui'  # Substitua pela sua chave API

# Importar a aplicação FastAPI
from app.main import app

# Criar a aplicação WSGI
from fastapi.middleware.wsgi import WSGIMiddleware
application = WSGIMiddleware(app) 