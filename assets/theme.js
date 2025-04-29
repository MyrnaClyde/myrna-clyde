// Component loader
class ComponentLoader {
  static async loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      const html = await response.text();
      document.getElementById(elementId).innerHTML = html;
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
    }
  }
}

// Slideshow component
class Slideshow {
  constructor(element, options = {}) {
    this.element = element;
    this.slides = Array.from(element.children);
    this.currentIndex = 0;
    this.options = {
      autoplay: options.autoplay || false,
      interval: options.interval || 5000
    };
    
    this.init();
  }

  init() {
    if (this.slides.length <= 1) return;
    
    this.showSlide(0);
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    this.currentIndex = index;
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  startAutoplay() {
    setInterval(() => this.nextSlide(), this.options.interval);
  }
}

// Cart functionality
class Cart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(item) {
    this.items.push(item);
    this.updateTotal();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load components
  ComponentLoader.loadComponent('header-container', '/components/header.html');
  ComponentLoader.loadComponent('footer-container', '/components/footer.html');

  // Initialize slideshow
  const slideshowElement = document.querySelector('.slideshow');
  if (slideshowElement) {
    new Slideshow(slideshowElement, { autoplay: true });
  }

  // Initialize cart
  window.cart = new Cart();
}); 