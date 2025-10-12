import type { ProductType } from '#app/generated/prisma/enums.js';

export type ProductTypeMonthTotalsModel = Record<ProductType, number[]>;
