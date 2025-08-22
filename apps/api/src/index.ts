import type { Role, User as UserInternal } from '#app/prisma/client/index.js';

export type User = {
  role: Role;
} & UserInternal;

export { Role } from '#app/constants/role.js';
export type {
  Color,
  Customer,
  CustomerContact,
  Product,
  ProductColor,
  ProductInventory,
  ProductSales,
  ProductType,
  State,
} from '#app/prisma/client/index.js';
