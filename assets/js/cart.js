import config from './config.js';

class Cart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.load();
  }

  // Carrega o carrinho do localStorage
  load() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const { items, total } = JSON.parse(savedCart);
      this.items = items;
      this.total = total;
    }
  }

  // Salva o carrinho no localStorage
  save() {
    localStorage.setItem('cart', JSON.stringify({
      items: this.items,
      total: this.total
    }));
  }

  // Adiciona um item ao carrinho
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }
    
    this.updateTotal();
    this.save();
    this.notifyChange();
  }

  // Remove um item do carrinho
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.updateTotal();
    this.save();
    this.notifyChange();
  }

  // Atualiza a quantidade de um item
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateTotal();
      this.save();
      this.notifyChange();
    }
  }

  // Atualiza o total do carrinho
  updateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  // Limpa o carrinho
  clear() {
    this.items = [];
    this.total = 0;
    this.save();
    this.notifyChange();
  }

  // Notifica mudanças no carrinho
  notifyChange() {
    const event = new CustomEvent('cart:updated', {
      detail: {
        items: this.items,
        total: this.total
      }
    });
    document.dispatchEvent(event);
  }

  // Formata o preço
  formatMoney(amount) {
    return config.moneyFormat.format.replace('{{amount_with_comma_separator}}', 
      amount.toFixed(2).replace('.', ','));
  }
}

// Exporta uma instância única do carrinho
export const cart = new Cart(); 