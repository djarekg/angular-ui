import { ProductType } from '#app/constants/product-type.js';
import { Color, type PrismaClient } from '#app/generated/prisma/client.js';

export const createProductColors = async (prisma: PrismaClient) => {
  console.log('Seeding ProductColor...');

  const createProductColors = async () =>
    prisma.productColor.createMany({
      data: [
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Dress },
          }))!.id,
          color: Color.BLACK,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Hat },
          }))!.id,
          color: Color.GREEN,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Hoodie },
          }))!.id,
          color: Color.BLUE,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Jacket },
          }))!.id,
          color: Color.PINK,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Pants },
          }))!.id,
          color: Color.BLUE,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Shirt },
          }))!.id,
          color: Color.RED,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Shoes },
          }))!.id,
          color: Color.WHITE,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Shorts },
          }))!.id,
          color: Color.YELLOW,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Socks },
          }))!.id,
          color: Color.WHITE,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Sweater },
          }))!.id,
          color: Color.BLACK,
        },
        {
          productId: (await prisma.product.findFirst({
            where: { productTypeId: ProductType.Underwear },
          }))!.id,
          color: Color.ORANGE,
        },
      ],
    });

  await createProductColors();
};
