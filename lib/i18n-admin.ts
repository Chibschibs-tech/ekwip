export const translations = {
  fr: {
    common: {
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      create: "Créer",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      import: "Importer",
      actions: "Actions",
      status: "Statut",
      active: "Actif",
      inactive: "Inactif",
      loading: "Chargement...",
      noResults: "Aucun résultat",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer cet élément ?",
    },
    dashboard: {
      title: "Tableau de bord",
      revenue: "Chiffre d'affaires",
      orders: "Commandes",
      customers: "Clients",
      products: "Produits",
      recentOrders: "Commandes récentes",
      topProducts: "Produits populaires",
      salesChart: "Évolution des ventes",
    },
    products: {
      title: "Produits",
      addProduct: "Ajouter un produit",
      editProduct: "Modifier le produit",
      name: "Nom",
      sku: "SKU",
      price: "Prix",
      stock: "Stock",
      category: "Catégorie",
      brand: "Marque",
      status: "Statut",
    },
    orders: {
      title: "Commandes",
      orderNumber: "N° de commande",
      customer: "Client",
      total: "Total",
      status: "Statut",
      date: "Date",
      pending: "En attente",
      processing: "En traitement",
      shipped: "Expédiée",
      delivered: "Livrée",
      cancelled: "Annulée",
    },
  },
}

export function t(key: string): string {
  const keys = key.split(".")
  let value: any = translations.fr
  for (const k of keys) {
    value = value[k]
    if (!value) return key
  }
  return value
}
