import { ProductType } from '#app/constants/product-type.js';
import { PrismaClient } from '#app/prisma/client/index.js';

export const createProductColors = async (prisma: PrismaClient) => {
  console.group('Seeding product colors...');

  const createProductColors = async () =>
    prisma.productColor.createMany({
      data: [
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Dress },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Black' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Hat },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Green' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Hoodie },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Blue' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Jacket },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Pink' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Pants },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Blue' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Shirt },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Red' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Shoes },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'White' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Shorts },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Yellow' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Socks },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'White' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Sweater },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Black' } }))!.id,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Underwear },
          }))!.id,
          colorId: (await prisma.color.findFirst({ where: { name: 'Orange' } }))!.id,
        },
      ],
    });

  console.log('Adding dress product colors...');
  await createProductColors();

  console.groupEnd();
};
