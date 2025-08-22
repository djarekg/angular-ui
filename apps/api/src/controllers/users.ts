import { prisma } from '#app/client/index.js';
import type { Context } from 'koa';

export const getUsers = async (ctx: Context) => {
  const users = await prisma.user.findMany();

  ctx.body = users;
};

export const getUser = async (ctx: Context) => {
  const { params: { username } } = ctx;
  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });

  ctx.body = user;
};
