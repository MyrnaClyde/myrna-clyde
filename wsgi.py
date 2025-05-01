import sys
import os

# Adicionar o diretório do projeto ao PYTHONPATH
path = os.path.dirname(os.path.abspath(__file__))
if path not in sys.path:
    sys.path.append(path)

# Importar a aplicação FastAPI
from app.main import app

# Criar a aplicação WSGI
from fastapi.middleware.wsgi import WSGIMiddleware
application = WSGIMiddleware(app) 