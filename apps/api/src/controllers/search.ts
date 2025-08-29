import { prisma } from '#app/client/index.js';
import type { Context } from 'koa';

export const search = async (ctx: Context) => {
  const { params: { query } } = ctx;

  const [users, customers, customerContacts] = await Promise.all([
    getUsers(query),
    getCustomers(query),
    getCustomerContacts(query),
  ]);

  const results = [...users, ...customers, ...customerContacts];
  ctx.body = results.length > 0 ? results : null;
};

const getCustomers = async (query: string) => {
  const customers = await prisma.customer.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    select: {
      id: true,
      name: true,
      city: true,
      state: {
        select: {
          code: true,
        },
      },
    },
  });

  return customers.map(customer => ({
    id: customer.id,
    type: 1,
    name: customer.name,
    description: `${customer.city}, ${customer.state.code}`,
  }));
};

const getCustomerContacts = async (
  query: string,
) => {
  const customContacts = await prisma.customerContact.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: query,
          },
        },
        {
          lastName: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
          },
        },
        {
          phone: {
            contains: query,
          },
        },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      city: true,
      state: {
        select: {
          code: true,
        },
      },
    },
  });
  return customContacts.map(contact => ({
    id: contact.id,
    type: 2,
    name: `${contact.firstName} ${contact.lastName}`,
    description: `${contact.city}, ${contact.state.code}`,
  }));
};

const getUsers = async (query: string) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: query,
          },
        },
        {
          lastName: {
            contains: query,
          },
        },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      city: true,
      state: {
        select: {
          code: true,
        },
      },
    },
  });

  return users.map(user => ({
    id: user.id,
    type: 0,
    name: `${user.firstName} ${user.lastName}`,
    description: `${user.city}, ${user.state.code}`,
  }));
};
