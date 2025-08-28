import { ProductType } from '#app/constants/product-type.js';
import { type PrismaClient, Size } from '#app/generated/prisma/client.js';

export const createProductInventories = async (prisma: PrismaClient) => {
  console.log('Seeding ProductInventory...');

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
          size: Size.XSMALL,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.SMALL,
          quantity: 8,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.MEDIUM,
          quantity: 2,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.LARGE,
          quantity: 13,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XLARGE,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XXLARGE,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XXXLARGE,
          quantity: 4,
        },
        {
          productId: await getProductId(ProductType.Dress),
          size: Size.XSMALL,
          quantity: 44,
        },
        {
          productId: await getProductId(ProductType.Hat),
          size: Size.ONESIZE,
          quantity: 33,
        },
        {
          productId: await getProductId(ProductType.Hoodie),
          size: Size.SMALL,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Jacket),
          size: Size.MEDIUM,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Pants),
          size: Size.SMALL,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Shirt),
          size: Size.SMALL,
          quantity: 2,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.SMALL,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.SMALL,
          quantity: 9,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.MEDIUM,
          quantity: 10,
        },
        {
          productId: await getProductId(ProductType.Shorts),
          size: Size.LARGE,
          quantity: 3,
        },
        {
          productId: await getProductId(ProductType.Socks),
          size: Size.MEDIUM,
          quantity: 76,
        },
        {
          productId: await getProductId(ProductType.Sweater),
          size: Size.SMALL,
          quantity: 4,
        },
        {
          productId: await getProductId(ProductType.Sweater),
          size: Size.MEDIUM,
          quantity: 4,
        },
        {
          productId: await getProductId(ProductType.Underwear),
          size: Size.MEDIUM,
          quantity: 50,
        },
      ],
    });

  await createInventories();
};
