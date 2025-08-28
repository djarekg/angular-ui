import { ProductType } from '#app/constants/product-type.js';
import type { PrismaClient } from '#app/generated/prisma/client.js';

export const createProductTypes = async (prisma: PrismaClient) => {
  console.log('Seeding ProductType...');

  const productTypes = Object.entries(ProductType).map(([key, value]) => ({
    id: value,
    name: key,
  }));

  const createProductType = ({ id, name }: { id: string; name: string; }) =>
    prisma.productType.create({
      data: {
        id,
        name,
      },
    });

  await Promise.all(productTypes.map(productType => createProductType(productType)));
};
