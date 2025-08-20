export const ProductType = {
  Dress: '0195c341-51f3-7000-9086-a7c133078f8e',
  Hat: '0195c341-51f3-7001-ba6b-7163d136442f',
  Hoodie: '0195c341-51f3-7002-8708-7c1a2a0b5eba',
  Jacket: '0195c341-51f3-7003-bc5d-278bf4340cb9',
  Pants: '0195c341-51f3-7004-a06f-d69ec15da8ea',
  Shirt: '0195c341-51f3-7005-bb5b-ad8d4bda6b6d',
  Shoes: '0195c341-51f3-7006-ab76-cf9ff96009c5',
  Shorts: '0195c341-51f3-7007-ba24-535694db3bee',
  Socks: '0195c341-51f3-7008-bdd5-854ed23db590',
  Sweater: '0195c341-51f3-7009-be62-e8b3b2d50db1',
  Underwear: '0195c341-51f3-700a-9f5d-083cf7fdcdc6',
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];
