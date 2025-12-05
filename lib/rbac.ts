// Role-Based Access Control (RBAC)
export const roles = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "staff",
} as const

export type Role = (typeof roles)[keyof typeof roles]

export const permissions = {
  // Dashboard
  VIEW_DASHBOARD: "view_dashboard",

  // Products
  VIEW_PRODUCTS: "view_products",
  CREATE_PRODUCTS: "create_products",
  EDIT_PRODUCTS: "edit_products",
  DELETE_PRODUCTS: "delete_products",

  // Categories
  VIEW_CATEGORIES: "view_categories",
  CREATE_CATEGORIES: "create_categories",
  EDIT_CATEGORIES: "edit_categories",
  DELETE_CATEGORIES: "delete_categories",

  // Orders
  VIEW_ORDERS: "view_orders",
  EDIT_ORDERS: "edit_orders",
  DELETE_ORDERS: "delete_orders",

  // Customers
  VIEW_CUSTOMERS: "view_customers",
  EDIT_CUSTOMERS: "edit_customers",
  DELETE_CUSTOMERS: "delete_customers",

  // Settings
  VIEW_SETTINGS: "view_settings",
  EDIT_SETTINGS: "edit_settings",

  // Users
  VIEW_USERS: "view_users",
  CREATE_USERS: "create_users",
  EDIT_USERS: "edit_users",
  DELETE_USERS: "delete_users",
} as const

export type Permission = (typeof permissions)[keyof typeof permissions]

export const rolePermissions: Record<Role, Permission[]> = {
  [roles.SUPER_ADMIN]: Object.values(permissions),
  [roles.ADMIN]: [
    permissions.VIEW_DASHBOARD,
    permissions.VIEW_PRODUCTS,
    permissions.CREATE_PRODUCTS,
    permissions.EDIT_PRODUCTS,
    permissions.DELETE_PRODUCTS,
    permissions.VIEW_CATEGORIES,
    permissions.CREATE_CATEGORIES,
    permissions.EDIT_CATEGORIES,
    permissions.DELETE_CATEGORIES,
    permissions.VIEW_ORDERS,
    permissions.EDIT_ORDERS,
    permissions.VIEW_CUSTOMERS,
    permissions.EDIT_CUSTOMERS,
    permissions.VIEW_SETTINGS,
  ],
  [roles.MANAGER]: [
    permissions.VIEW_DASHBOARD,
    permissions.VIEW_PRODUCTS,
    permissions.CREATE_PRODUCTS,
    permissions.EDIT_PRODUCTS,
    permissions.VIEW_CATEGORIES,
    permissions.VIEW_ORDERS,
    permissions.EDIT_ORDERS,
    permissions.VIEW_CUSTOMERS,
  ],
  [roles.STAFF]: [
    permissions.VIEW_DASHBOARD,
    permissions.VIEW_PRODUCTS,
    permissions.VIEW_ORDERS,
    permissions.VIEW_CUSTOMERS,
  ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, requiredPermissions: Permission[]): boolean {
  return requiredPermissions.some((permission) => hasPermission(role, permission))
}

export function hasAllPermissions(role: Role, requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every((permission) => hasPermission(role, permission))
}
