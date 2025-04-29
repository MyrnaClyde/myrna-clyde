// Função para remover scripts do Shopify
function removeShopifyScripts() {
  // Remove scripts do Shopify
  document.querySelectorAll('script').forEach(script => {
    if (script.src.includes('shopify') || 
        script.innerHTML.includes('Shopify') ||
        script.src.includes('myshopify.com')) {
      script.remove();
    }
  });
  
  // Remove meta tags específicas do Shopify
  const removeMeta = [
    'shopify-checkout',
    'shopify-digital-wallet',
    'shopify-features',
    'shopify-payment-button'
  ];
  
  removeMeta.forEach(name => {
    document.querySelector(`meta[name="${name}"]`)?.remove();
  });
  
  // Remove links para CDN do Shopify
  document.querySelectorAll('link[href*="shopify"]').forEach(link => {
    link.remove();
  });
  
  // Remove elementos com classes específicas do Shopify
  const removeClasses = [
    'shopify-payment-button',
    'shopify-buy-button',
    'shopify-section'
  ];
  
  removeClasses.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(el => {
      el.remove();
    });
  });
}

// Função para substituir variáveis Liquid
function replaceLiquidVariables() {
  // Substitui formatação de preço
  document.querySelectorAll('[data-money-format]').forEach(el => {
    const format = el.dataset.moneyFormat;
    if (format) {
      el.dataset.moneyFormat = format.replace('{{amount_with_comma_separator}}', '0,00');
    }
  });
  
  // Substitui tags de cliente
  document.querySelectorAll('[data-customer-tags]').forEach(el => {
    el.removeAttribute('data-customer-tags');
  });
}

// Função para limpar o DOM
function cleanDOM() {
  // Remove elementos vazios
  document.querySelectorAll('div:empty, span:empty').forEach(el => {
    el.remove();
  });
  
  // Remove atributos desnecessários
  document.querySelectorAll('[data-shopify]').forEach(el => {
    el.removeAttribute('data-shopify');
  });
}

// Função principal de limpeza
function cleanShopify() {
  console.log('Iniciando limpeza do Shopify...');
  
  // Remove scripts e meta tags
  removeShopifyScripts();
  
  // Substitui variáveis Liquid
  replaceLiquidVariables();
  
  // Limpa o DOM
  cleanDOM();
  
  console.log('Limpeza do Shopify concluída!');
}

// Executa a limpeza quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', cleanShopify);

// Exporta a função para uso em outros módulos
export default cleanShopify; 