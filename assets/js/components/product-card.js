import { cart } from '../cart.js';

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['product'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'product' && oldValue !== newValue) {
      this.product = JSON.parse(newValue);
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    if (!this.product) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 1rem;
        }
        
        .product-card {
          border: 1px solid #eee;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.2s;
        }
        
        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .product-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
        
        .product-info {
          padding: 1rem;
        }
        
        .product-title {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .product-price {
          color: #666;
          margin-bottom: 1rem;
        }
        
        .product-variants {
          margin-bottom: 1rem;
        }
        
        .variant-select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        
        .add-to-cart {
          width: 100%;
          padding: 0.75rem;
          background: #000;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }
        
        .add-to-cart:hover {
          background: #333;
        }
        
        .add-to-cart:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      </style>
      
      <div class="product-card">
        <img class="product-image" src="${this.product.image}" alt="${this.product.title}">
        <div class="product-info">
          <h3 class="product-title">${this.product.title}</h3>
          <div class="product-price">${this.formatMoney(this.product.price)}</div>
          
          ${this.product.variants.length > 1 ? `
            <div class="product-variants">
              <select class="variant-select">
                ${this.product.variants.map(variant => `
                  <option value="${variant.id}">${variant.title}</option>
                `).join('')}
              </select>
            </div>
          ` : ''}
          
          <button class="add-to-cart">Adicionar ao Carrinho</button>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const addToCartButton = this.shadowRoot.querySelector('.add-to-cart');
    const variantSelect = this.shadowRoot.querySelector('.variant-select');
    
    addToCartButton.addEventListener('click', () => {
      const variantId = variantSelect ? variantSelect.value : this.product.variants[0].id;
      const variant = this.product.variants.find(v => v.id === variantId);
      
      cart.addItem({
        id: variant.id,
        title: this.product.title,
        price: variant.price,
        image: this.product.image
      });
      
      // Feedback visual
      addToCartButton.textContent = 'Adicionado!';
      addToCartButton.disabled = true;
      
      setTimeout(() => {
        addToCartButton.textContent = 'Adicionar ao Carrinho';
        addToCartButton.disabled = false;
      }, 2000);
    });
  }

  formatMoney(amount) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }
}

// Registra o componente
customElements.define('product-card', ProductCard); 