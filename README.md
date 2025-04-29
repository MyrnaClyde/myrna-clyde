# Anna Prata - E-commerce

Este é o código fonte do e-commerce da Anna Prata, uma loja de joias artesanais em prata 950 com pedras naturais.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Components
- Express.js
- Node.js

## Estrutura do Projeto

```
anna-prata/
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── components/
│   │   │   ├── mini-cart.js
│   │   │   └── product-card.js
│   │   ├── cart.js
│   │   ├── clean-shopify.js
│   │   ├── config.js
│   │   └── main.js
│   └── images/
├── data/
│   └── products.json
├── public/
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/anna-prata.git
cd anna-prata
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o site em `http://localhost:3000`

## Funcionalidades

- Exibição de produtos e coleções
- Carrinho de compras com localStorage
- Checkout integrado com gateway de pagamento
- Design responsivo
- Animações e transições suaves
- SEO otimizado

## Desenvolvimento

### Estrutura de Arquivos

- `assets/`: Contém todos os arquivos estáticos (CSS, JS, imagens)
- `data/`: Contém os dados estáticos (produtos, coleções)
- `public/`: Contém os arquivos públicos (HTML)
- `server.js`: Servidor Express
- `package.json`: Configurações do projeto

### Componentes

- `mini-cart.js`: Componente do mini-carrinho
- `product-card.js`: Componente de exibição de produtos

### Estilos

- `main.css`: Estilos globais
- Animações e transições
- Design responsivo
- Tema personalizado

## Produção

Para build de produção:

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm start
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 