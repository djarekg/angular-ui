import type { PrismaClient } from '#app/prisma/client/index.js';

export type Context = {
  prisma: PrismaClient;
};
