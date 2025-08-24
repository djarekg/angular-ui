import { Gender } from '#app/constants/gender.js';
import { ProductType } from '#app/constants/product-type.js';
import { PrismaClient } from '#app/prisma/client/index.js';
import { faker } from '@faker-js/faker';

export const createProducts = async (prisma: PrismaClient) => {
  console.group('Seeding products');

  const createDressProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createCamoHatProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createHoodieProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createJacketProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createPantsProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createShirtProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createShoesProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createShortsProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createSocksProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createSweaterProduct = (gender: Gender) =>
    prisma.product.create({
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

  const createUnderwearProduct = (gender: Gender) =>
    prisma.product.create({
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

  for (const [key, value] of Object.entries(Gender)) {
    console.log(`Adding ${key} dressses...`);
    Array.from({ length: 5 }).map(async () => await createDressProduct(value));

    console.log(`Adding ${key} hats...`);
    Array.from({ length: 5 }).map(async () => await createCamoHatProduct(value));

    console.log(`Adding ${key} hoodies...`);
    Array.from({ length: 7 }).map(async () => await createHoodieProduct(value));

    console.log(`Adding ${key} jackets...`);
    Array.from({ length: 4 }).map(async () => await createJacketProduct(value));

    console.log(`Adding ${key} pants...`);
    Array.from({ length: 3 }).map(async () => await createPantsProduct(value));

    console.log(`Adding ${key} shirts...`);
    Array.from({ length: 5 }).map(async () => await createShirtProduct(value));

    console.log(`Adding ${key} shoes...`);
    Array.from({ length: 6 }).map(async () => await createShoesProduct(value));

    console.log(`Adding ${key} shorts...`);
    Array.from({ length: 3 }).map(async () => await createShortsProduct(value));

    console.log(`Adding ${key} socks...`);
    Array.from({ length: 33 }).map(async () => await createSocksProduct(value));

    console.log(`Adding ${key} sweaters...`);
    Array.from({ length: 7 }).map(async () => await createSweaterProduct(value));

    console.log(`Adding ${key} underwear...`);
    Array.from({ length: 5 }).map(async () => await createUnderwearProduct(value));
  }

  console.groupEnd();
};
