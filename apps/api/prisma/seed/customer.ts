import type { PrismaClient } from '#app/prisma/client/index.js';
import { faker } from './faker-context.ts';
import { useState } from './state.ts';

export const createCustomers = async (prisma: PrismaClient) => {
  console.group('Seeding customers');

  const { randomStateId } = await useState(prisma);

  const createCustomer = () =>
    prisma.customer.create({
      data: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        streetAddress: faker.location.streetAddress(),
        streetAddress2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        stateId: randomStateId(),
        zip: faker.location.zipCode(),
        phone: faker.phone.number(),
        isActive: faker.datatype.boolean(0.8),
      },
    });

  console.log('Adding customers...');
  Array.from({ length: 120 }).forEach(async () => await createCustomer());

  console.groupEnd();
};
