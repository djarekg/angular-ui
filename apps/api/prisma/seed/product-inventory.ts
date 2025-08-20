import { ProductType } from '#app/constants/product-type.js';
import { Size } from '#app/constants/size.js';
import { PrismaClient } from '#app/prisma/client/index.js';

export const createProductInventories = async (prisma: PrismaClient) => {
  console.log('Seeding inventories...');

  const idCache: Record<ProductType, string> = {} as Record<ProductType, string>;
  const getProductId = async (type: ProductType) => {
    if (!idCache[type]) {
      idCache[type] = (await prisma.product.findFirst({ where: { productTypeId: type } }))!.id;
    }
    return idCache[type];
  };

  const createInventories = async () =>
    prisma.productInventory.createMany({
      data: [
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XSmall,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.Small,
          quantity: 8,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.Medium,
          quantity: 2,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.Large,
          quantity: 13,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XLarge,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XXLarge,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XXXLarge,
          quantity: 4,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XSmall,
          quantity: 44,
        },
        {
          productId: await getProductId(ProductType.Hat),
          size: Size.Onesize,
          quantity: 33,
        },
        {
          productId: await getProductId(ProductType.Hoodie),
          size: Size.Small,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Jacket),
          size: Size.Medium,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Pants),
          size: Size.Small,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Shirt),
          size: Size.Small,
          quantity: 2,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.Small,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.Small,
          quantity: 9,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.Medium,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.Large,
          quantity: 3,
        },
        {
          productId: await getProductId(ProductType.Socks),
          size: Size.Medium,
          quantity: 76,
        },
        {
          productId: await getProductId(ProductType.Sweater),
          size: Size.Small,
          quantity: 4,
        },
        {
          productId: await getProductId(ProductType.Sweater),
          size: Size.Medium,
          quantity: 4,
        },
        {
          productId: await getProductId(ProductType.Underwear),
          size: Size.Medium,
          quantity: 50,
        },
      ],
    });

  console.log('Adding inventories...');
  await createInventories();

  console.groupEnd();
};
