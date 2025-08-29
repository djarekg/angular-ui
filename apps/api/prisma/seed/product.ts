import { ProductType } from '#app/constants/product-type.js';
import { Gender, PrismaClient } from '#app/generated/prisma/client.js';
import { faker } from '@faker-js/faker';

export const createProducts = async (prisma: PrismaClient) => {
  console.log('Seeding Product...');

  const createDressProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Dress`,
        description: `${faker.commerce.productDescription()} dress`,
        price: faker.commerce.price({ min: 10, max: 100 }),
        productTypeId: ProductType.Dress,
        genderId: gender,
        isActive: true,
      },
    });

  const createCamoHatProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Hat`,
        description: `${faker.commerce.productDescription()} hat`,
        price: faker.commerce.price({ min: 10, max: 50 }),
        productTypeId: ProductType.Hat,
        genderId: gender,
        isActive: true,
      },
    });

  const createHoodieProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Hoodie`,
        description: `${faker.commerce.productDescription()} hoodie`,
        price: faker.commerce.price({ min: 20, max: 80 }),
        productTypeId: ProductType.Hoodie,
        genderId: gender,
        isActive: true,
      },
    });

  const createJacketProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Jacket`,
        description: `${faker.commerce.productDescription()} jacket`,
        price: faker.commerce.price({ min: 30, max: 120 }),
        productTypeId: ProductType.Jacket,
        genderId: gender,
        isActive: true,
      },
    });

  const createPantsProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} ${faker.word.interjection()} Pants`,
        description: `${faker.commerce.productDescription()} pants`,
        price: faker.commerce.price({ min: 15, max: 90 }),
        productTypeId: ProductType.Pants,
        genderId: gender,
        isActive: true,
      },
    });

  const createShirtProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Shirt`,
        description: `${faker.commerce.productDescription()} shirt`,
        price: faker.commerce.price({ min: 10, max: 70 }),
        productTypeId: ProductType.Shirt,
        genderId: gender,
        isActive: true,
      },
    });

  const createShoesProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Shoes`,
        description: `${faker.commerce.productDescription()} shoes`,
        price: faker.commerce.price({ min: 25, max: 150 }),
        productTypeId: ProductType.Shoes,
        genderId: gender,
        isActive: true,
      },
    });

  const createShortsProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Shorts`,
        description: `${faker.commerce.productDescription()} shorts`,
        price: faker.commerce.price({ min: 15, max: 80 }),
        productTypeId: ProductType.Shorts,
        genderId: gender,
        isActive: true,
      },
    });

  const createSocksProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Socks`,
        description: `${faker.commerce.productDescription()} socks`,
        price: faker.commerce.price({ min: 5, max: 30 }),
        productTypeId: ProductType.Socks,
        genderId: gender,
        isActive: true,
      },
    });

  const createSweaterProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Sweater`,
        description: `${faker.commerce.productDescription()} sweater`,
        price: faker.commerce.price({ min: 20, max: 100 }),
        productTypeId: ProductType.Sweater,
        genderId: gender,
        isActive: true,
      },
    });

  const createUnderwearProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} Underwear`,
        description: `${faker.commerce.productDescription()} underwear`,
        price: faker.commerce.price({ min: 5, max: 50 }),
        productTypeId: ProductType.Underwear,
        genderId: gender,
        isActive: true,
      },
    });

  for (const [_, value] of Object.entries(Gender)) {
    Array.from({ length: 5 }).forEach(async () => await createDressProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createCamoHatProduct(value));
    Array.from({ length: 7 }).forEach(async () => await createHoodieProduct(value));
    Array.from({ length: 4 }).forEach(async () => await createJacketProduct(value));
    Array.from({ length: 3 }).forEach(async () => await createPantsProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createShirtProduct(value));
    Array.from({ length: 6 }).forEach(async () => await createShoesProduct(value));
    Array.from({ length: 3 }).forEach(async () => await createShortsProduct(value));
    Array.from({ length: 33 }).forEach(async () => await createSocksProduct(value));
    Array.from({ length: 7 }).forEach(async () => await createSweaterProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createUnderwearProduct(value));
  }
};
