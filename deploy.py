import os
import subprocess
import sys

def run_command(command):
    print(f"Executando: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Erro ao executar comando: {result.stderr}")
        sys.exit(1)
    print(result.stdout)

def deploy():
    # 1. Atualizar o código
    print("Atualizando código...")
    run_command("git pull origin master")

    # 2. Criar ambiente virtual se não existir
    if not os.path.exists("venv"):
        print("Criando ambiente virtual...")
        run_command("python3 -m venv venv")

    # 3. Ativar ambiente virtual e instalar dependências
    print("Instalando dependências...")
    if os.name == 'nt':  # Windows
        run_command("venv\\Scripts\\pip install -r requirements.txt")
    else:  # Linux/Mac
        run_command("source venv/bin/activate && pip install -r requirements.txt")

    # 4. Testar a aplicação localmente
    print("Testando aplicação...")
    try:
        import uvicorn
        from app.main import app
        print("Aplicação carregada com sucesso!")
    except Exception as e:
        print(f"Erro ao carregar aplicação: {e}")
        sys.exit(1)

    print("\nDeploy concluído com sucesso!")
    print("\nPróximos passos:")
    print("1. Acesse https://www.pythonanywhere.com")
    print("2. Vá em 'Web' e configure seu web app")
    print("3. Copie o conteúdo do arquivo wsgi.py para o arquivo WSGI no PythonAnywhere")
    print("4. Configure o virtualenv para /home/myrnaclyde/myrna/venv")
    print("5. Adicione as variáveis de ambiente:")
    print("   - ENVIRONMENT=production")
    print("   - CHARGE_API_KEY=sua_chave_api_aqui")
    print("6. Clique em 'Reload'")

if __name__ == "__main__":
    deploy() 