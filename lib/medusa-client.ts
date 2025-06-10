// If this file exists, we'll replace it with a mock implementation
export const createMedusaClient = () => {
  return {
    products: {
      list: async () => ({ products: [] }),
      retrieve: async () => ({ product: null }),
    },
    collections: {
      list: async () => ({ collections: [] }),
    },
    carts: {
      create: async () => ({ cart: { id: "mock-cart" } }),
      update: async () => ({ cart: { id: "mock-cart" } }),
    },
  }
}

export default createMedusaClient
