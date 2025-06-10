// This file provides mock implementations for MedusaJS functions
// that might be imported in the codebase

export const createClient = () => {
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

export default createClient
