import { Role } from '#app/constants/role.js';
import { PrismaClient } from '#app/prisma/client/index.js';

export const createProductSales = async (prisma: PrismaClient) => {
  console.group('Seeding product sales...');

  const createProductSales = async () => {
    const customerIds = (await prisma.customer.findMany()).map(({ id }) => id);
    const salesUserIds = (await prisma.user.findMany({ where: { role: Role.Sales } })).map(
      ({ id }) => id
    );
    const products = await prisma.product.findMany({
      select: {
        id: true,
        price: true,
      },
    });

    for (const _ of Array.from({ length: 1000 })) {
      const { id: productId, price } = products[Math.floor(Math.random() * products.length)];
      const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
      const userId = salesUserIds[Math.floor(Math.random() * salesUserIds.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;

      await prisma.productSales.create({
        data: {
          productId,
          customerId,
          userId,
          quantity,
          price,
        },
      });

      console.log(
        `Created product sale: productId: ${productId}, customerId: ${customerId}, userId: ${userId}, quantity: ${quantity}`
      );
    }
  };

  console.log('Adding product sales...');
  await createProductSales();

  console.groupEnd();
};
