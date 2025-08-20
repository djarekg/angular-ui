/**
 * User roles.
 */
export const Role = {
  Admin: 'e7b8c7e2-1f2a-4b3a-9c1d-2a5b7c8d9e0f',
  User: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  Sales: 'f1e2d3c4-b5a6-7980-1c2d-3e4f5a6b7c8d',
  Accounting: '0a1b2c3d-4e5f-6789-abcd-ef0123456789',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
