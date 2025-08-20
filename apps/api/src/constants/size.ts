export const Size = {
  XSmall: crypto.randomUUID(),
  Small: crypto.randomUUID(),
  Medium: crypto.randomUUID(),
  Large: crypto.randomUUID(),
  XLarge: crypto.randomUUID(),
  XXLarge: crypto.randomUUID(),
  XXXLarge: crypto.randomUUID(),
  Onesize: crypto.randomUUID(),
} as const;

export type Size = (typeof Size)[keyof typeof Size];
