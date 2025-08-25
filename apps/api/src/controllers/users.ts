import { prisma } from '#app/client/index.js';
import type { User } from '#app/prisma/client/index.js';
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

export const updateUser = async (ctx: Context) => {
  const { params: { id }, request } = ctx;

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: (request as any).body as User,
    });

    ctx.body = user;
  }
  catch (err) {
    console.error(`Failed to update user id: ${id}`, err);
    ctx.status = 500;
  }
};

export const deleteUser = async (ctx: Context) => {
  const { params: { id } } = ctx;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    ctx.body = true;
  }
  catch (err) {
    console.error(`Failed to delete user id: ${id}`, err);
    ctx.status = 500;
  }
};
