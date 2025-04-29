import cleanShopify from './clean-shopify.js';
import { cart } from './cart.js';
import './components/mini-cart.js';
import './components/product-card.js';

// Carrega os dados dos produtos
async function loadProducts() {
  try {
    const response = await fetch('/data/products.json');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
}

// Inicializa a página de produtos
async function initProductsPage() {
  const productsContainer = document.querySelector('.products-grid');
  if (!productsContainer) return;

  const products = await loadProducts();
  
  products.forEach(product => {
    const productCard = document.createElement('product-card');
    productCard.setAttribute('product', JSON.stringify(product));
    productsContainer.appendChild(productCard);
  });
}

// Inicializa a página de coleções
async function initCollectionsPage() {
  const collectionsContainer = document.querySelector('.collections-grid');
  if (!collectionsContainer) return;

  try {
    const response = await fetch('/data/products.json');
    const data = await response.json();
    
    data.collections.forEach(collection => {
      const collectionCard = document.createElement('div');
      collectionCard.className = 'collection-card';
      collectionCard.innerHTML = `
        <img src="${collection.image}" alt="${collection.title}">
        <h3>${collection.title}</h3>
        <p>${collection.description}</p>
      `;
      collectionsContainer.appendChild(collectionCard);
    });
  } catch (error) {
    console.error('Erro ao carregar coleções:', error);
  }
}

// Inicializa a página de checkout
function initCheckoutPage() {
  const checkoutForm = document.querySelector('#checkout-form');
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Aqui você implementaria a integração com o gateway de pagamento
    console.log('Processando pagamento...');
  });
}

// Inicializa o mini-carrinho
function initMiniCart() {
  const miniCartContainer = document.querySelector('.mini-cart-container');
  if (!miniCartContainer) return;

  const miniCart = document.createElement('mini-cart');
  miniCartContainer.appendChild(miniCart);
}

// Função principal de inicialização
function init() {
  // Limpa as dependências do Shopify
  cleanShopify();
  
  // Inicializa o mini-carrinho
  initMiniCart();
  
  // Inicializa a página atual
  const currentPage = document.body.dataset.page;
  
  switch (currentPage) {
    case 'products':
      initProductsPage();
      break;
    case 'collections':
      initCollectionsPage();
      break;
    case 'checkout':
      initCheckoutPage();
      break;
  }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init); 