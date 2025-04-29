# Configuração do Git para o Projeto

## Token de Acesso

O token de acesso ao repositório foi configurado no arquivo `.git/config`. Este token permite fazer push e pull do repositório sem necessidade de autenticação adicional.

## Como Usar

1. O token já está configurado no arquivo `.git/config`
2. Para fazer push:
```bash
git add .
git commit -m "sua mensagem"
git push origin master
```

3. Para fazer pull:
```bash
git pull origin master
```

## Segurança

- Mantenha o arquivo `.git/config` seguro
- Não compartilhe o token com outras pessoas
- Se o token for comprometido, gere um novo no GitHub

## Geração de Novo Token

Se precisar gerar um novo token:

1. Acesse https://github.com/settings/tokens
2. Clique em "Generate new token"
3. Selecione os escopos necessários (pelo menos `repo`)
4. Copie o novo token
5. Atualize o arquivo `.git/config` com o novo token

## Nota Importante

O token atual tem acesso de leitura e escrita ao repositório. Mantenha-o seguro e não o compartilhe publicamente. 