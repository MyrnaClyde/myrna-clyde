import { cart } from '../cart.js';

class MiniCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
        }
        
        .mini-cart {
          position: absolute;
          right: 0;
          top: 100%;
          width: 300px;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 4px;
          padding: 1rem;
          z-index: 1000;
        }
        
        .cart-items {
          max-height: 300px;
          overflow-y: auto;
        }
        
        .cart-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }
        
        .cart-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          margin-right: 1rem;
        }
        
        .cart-item-details {
          flex: 1;
        }
        
        .cart-item-title {
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .cart-item-price {
          color: #666;
        }
        
        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .cart-total {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
          text-align: right;
          font-weight: 500;
        }
        
        .cart-actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
        }
        
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .checkout-button {
          background: #000;
          color: white;
          flex: 1;
        }
        
        .clear-button {
          background: #f5f5f5;
          color: #666;
        }
      </style>
      
      <div class="mini-cart">
        <div class="cart-items">
          ${this.renderCartItems()}
        </div>
        <div class="cart-total">
          Total: ${cart.formatMoney(cart.total)}
        </div>
        <div class="cart-actions">
          <button class="checkout-button">Finalizar Compra</button>
          <button class="clear-button">Limpar</button>
        </div>
      </div>
    `;
  }

  renderCartItems() {
    if (cart.items.length === 0) {
      return '<p>Seu carrinho está vazio</p>';
    }

    return cart.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">${cart.formatMoney(item.price)}</div>
          <div class="cart-item-quantity">
            <button onclick="this.dispatchEvent(new CustomEvent('cart:update-quantity', { detail: { id: '${item.id}', quantity: ${item.quantity - 1} } }))">-</button>
            <span>${item.quantity}</span>
            <button onclick="this.dispatchEvent(new CustomEvent('cart:update-quantity', { detail: { id: '${item.id}', quantity: ${item.quantity + 1} } }))">+</button>
          </div>
        </div>
        <button onclick="this.dispatchEvent(new CustomEvent('cart:remove-item', { detail: { id: '${item.id}' } }))">×</button>
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Atualiza o carrinho quando houver mudanças
    document.addEventListener('cart:updated', () => {
      this.render();
    });

    // Manipula eventos do carrinho
    this.shadowRoot.addEventListener('cart:update-quantity', (e) => {
      const { id, quantity } = e.detail;
      cart.updateQuantity(id, quantity);
    });

    this.shadowRoot.addEventListener('cart:remove-item', (e) => {
      const { id } = e.detail;
      cart.removeItem(id);
    });

    // Botões de ação
    this.shadowRoot.querySelector('.checkout-button').addEventListener('click', () => {
      window.location.href = '/checkout';
    });

    this.shadowRoot.querySelector('.clear-button').addEventListener('click', () => {
      cart.clear();
    });
  }
}

// Registra o componente
customElements.define('mini-cart', MiniCart); 