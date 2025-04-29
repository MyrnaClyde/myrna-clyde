// Configurações globais do site
const config = {
  // Configurações da loja
  shop: {
    name: "Anna Prata",
    currency: "BRL",
    locale: "pt-BR",
    country: "BR"
  },
  
  // Configurações de formatação
  moneyFormat: {
    format: "R$ {{amount_with_comma_separator}}",
    withCurrency: "R$ {{amount_with_comma_separator}} BRL"
  },
  
  // Configurações de API
  api: {
    baseUrl: "/api",
    endpoints: {
      products: "/products",
      collections: "/collections",
      cart: "/cart",
      checkout: "/checkout"
    }
  },
  
  // Configurações de cache
  cache: {
    products: true,
    collections: true,
    cart: true
  }
};

// Exporta as configurações
export default config; 