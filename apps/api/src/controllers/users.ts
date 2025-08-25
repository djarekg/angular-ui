import { prisma } from '#app/client/index.js';
import type { Context } from 'koa';

export const getUsers = async (ctx: Context) => {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });

  ctx.body = users;
};

export const getUser = async (ctx: Context) => {
  const { params: { id } } = ctx;
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      role: true,
    },
  });

  ctx.body = user;
};
