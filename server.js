const express = require('express');
const path = require('path');
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para JSON
app.use(express.json());

// Rotas da API
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.get('/api/collections', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

// Rota para o carrinho
app.post('/api/cart', (req, res) => {
  // Aqui você implementaria a lógica do carrinho
  res.json({ success: true });
});

// Rota para checkout
app.post('/api/checkout', (req, res) => {
  // Aqui você implementaria a integração com o gateway de pagamento
  res.json({ success: true });
});

// Rota para todas as outras requisições
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 