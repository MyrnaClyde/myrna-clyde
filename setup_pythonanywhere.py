import requests
import os
from pythonanywhere_config import PYTHONANYWHERE_USERNAME, PYTHONANYWHERE_TOKEN

def setup_pythonanywhere():
    base_url = f'https://www.pythonanywhere.com/api/v0/user/{PYTHONANYWHERE_USERNAME}'
    headers = {'Authorization': f'Token {PYTHONANYWHERE_TOKEN}'}

    # 1. Criar diretório do projeto
    print("Criando diretório do projeto...")
    requests.post(
        f'{base_url}/files/path/home/{PYTHONANYWHERE_USERNAME}/myrna/',
        headers=headers
    )

    # 2. Configurar web app
    print("Configurando web app...")
    webapp_data = {
        'domain_name': f'{PYTHONANYWHERE_USERNAME}.pythonanywhere.com',
        'python_version': '3.9',
        'virtualenv_path': f'/home/{PYTHONANYWHERE_USERNAME}/myrna/venv',
        'source_directory': f'/home/{PYTHONANYWHERE_USERNAME}/myrna',
        'working_directory': f'/home/{PYTHONANYWHERE_USERNAME}/myrna',
        'wsgi_config_file': f'/var/www/{PYTHONANYWHERE_USERNAME}_pythonanywhere_com_wsgi.py'
    }
    
    response = requests.post(
        f'{base_url}/webapps/',
        headers=headers,
        json=webapp_data
    )
    
    if response.status_code == 201:
        print("Web app configurado com sucesso!")
    else:
        print(f"Erro ao configurar web app: {response.text}")

    # 3. Configurar variáveis de ambiente
    print("Configurando variáveis de ambiente...")
    env_vars = {
        'CHARGE_API_KEY': 'sua_chave_api_aqui',  # Substitua pela sua chave API
        'ENVIRONMENT': 'production'
    }
    
    response = requests.post(
        f'{base_url}/webapps/{PYTHONANYWHERE_USERNAME}.pythonanywhere.com/env/',
        headers=headers,
        json=env_vars
    )
    
    if response.status_code == 200:
        print("Variáveis de ambiente configuradas com sucesso!")
    else:
        print(f"Erro ao configurar variáveis de ambiente: {response.text}")

    # 4. Reiniciar web app
    print("Reiniciando web app...")
    response = requests.post(
        f'{base_url}/webapps/{PYTHONANYWHERE_USERNAME}.pythonanywhere.com/reload/',
        headers=headers
    )
    
    if response.status_code == 200:
        print("Web app reiniciado com sucesso!")
    else:
        print(f"Erro ao reiniciar web app: {response.text}")

if __name__ == '__main__':
    setup_pythonanywhere() 