export const Gender = {
  Male: '0195c341-51f3-7000-9086-a7c133078f8e',
  Female: '0195c341-51f3-7001-ba6b-7163d136442f',
  Unisex: '0195c341-51f3-7002-8708-7c1a2a0b5eba',
  Kids: '0195c341-51f3-7003-bc5d-278bf4340cb9',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
