import { Gender, PrismaClient, ProductType } from '#app/generated/prisma/client.js';
import { faker } from '@faker-js/faker';

export const createProducts = async (prisma: PrismaClient) => {
  console.log('Seeding Product...');

  const createDRESSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} DRESS`,
        description: `${faker.commerce.productDescription()} DRESS`,
        price: faker.commerce.price({ min: 10, max: 100 }),
        productType: ProductType.DRESS,
        genderId: gender,
        isActive: true,
      },
    });

  const createCamoHATProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} HAT`,
        description: `${faker.commerce.productDescription()} HAT`,
        price: faker.commerce.price({ min: 10, max: 50 }),
        productType: ProductType.HAT,
        genderId: gender,
        isActive: true,
      },
    });

  const createHOODIEProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} HOODIE`,
        description: `${faker.commerce.productDescription()} HOODIE`,
        price: faker.commerce.price({ min: 20, max: 80 }),
        productType: ProductType.HOODIE,
        genderId: gender,
        isActive: true,
      },
    });

  const createJACKETProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} JACKET`,
        description: `${faker.commerce.productDescription()} JACKET`,
        price: faker.commerce.price({ min: 30, max: 120 }),
        productType: ProductType.JACKET,
        genderId: gender,
        isActive: true,
      },
    });

  const createPANTSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} ${faker.word.interjection()} PANTS`,
        description: `${faker.commerce.productDescription()} PANTS`,
        price: faker.commerce.price({ min: 15, max: 90 }),
        productType: ProductType.PANTS,
        genderId: gender,
        isActive: true,
      },
    });

  const createSHIRTProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} SHIRT`,
        description: `${faker.commerce.productDescription()} SHIRT`,
        price: faker.commerce.price({ min: 10, max: 70 }),
        productType: ProductType.SHIRT,
        genderId: gender,
        isActive: true,
      },
    });

  const createSHOESProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} SHOES`,
        description: `${faker.commerce.productDescription()} SHOES`,
        price: faker.commerce.price({ min: 25, max: 150 }),
        productType: ProductType.SHOES,
        genderId: gender,
        isActive: true,
      },
    });

  const createSHORTSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} SHORTS`,
        description: `${faker.commerce.productDescription()} SHORTS`,
        price: faker.commerce.price({ min: 15, max: 80 }),
        productType: ProductType.SHORTS,
        genderId: gender,
        isActive: true,
      },
    });

  const createSOCKSProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} SOCKS`,
        description: `${faker.commerce.productDescription()} SOCKS`,
        price: faker.commerce.price({ min: 5, max: 30 }),
        productType: ProductType.SOCKS,
        genderId: gender,
        isActive: true,
      },
    });

  const createSWEATERProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} SWEATER`,
        description: `${faker.commerce.productDescription()} SWEATER`,
        price: faker.commerce.price({ min: 20, max: 100 }),
        productType: ProductType.SWEATER,
        genderId: gender,
        isActive: true,
      },
    });

  const createUNDERWEARProduct = async (gender: Gender) =>
    await prisma.product.create({
      data: {
        id: faker.string.uuid(),
        name: `${faker.commerce.productAdjective()} UNDERWEAR`,
        description: `${faker.commerce.productDescription()} UNDERWEAR`,
        price: faker.commerce.price({ min: 5, max: 50 }),
        productType: ProductType.UNDERWEAR,
        genderId: gender,
        isActive: true,
      },
    });

  for (const [_, value] of Object.entries(Gender)) {
    Array.from({ length: 5 }).forEach(async () => await createDRESSProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createCamoHATProduct(value));
    Array.from({ length: 7 }).forEach(async () => await createHOODIEProduct(value));
    Array.from({ length: 4 }).forEach(async () => await createJACKETProduct(value));
    Array.from({ length: 3 }).forEach(async () => await createPANTSProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createSHIRTProduct(value));
    Array.from({ length: 6 }).forEach(async () => await createSHOESProduct(value));
    Array.from({ length: 3 }).forEach(async () => await createSHORTSProduct(value));
    Array.from({ length: 33 }).forEach(async () => await createSOCKSProduct(value));
    Array.from({ length: 7 }).forEach(async () => await createSWEATERProduct(value));
    Array.from({ length: 5 }).forEach(async () => await createUNDERWEARProduct(value));
  }
};
