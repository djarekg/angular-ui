import type { PrismaClient } from '#app/generated/prisma/client.js';
import { faker } from './faker-context.ts';
import { useState } from './state.ts';

export const createCustomers = async (prisma: PrismaClient) => {
  console.log('Seeding Customer...');

  const { randomStateId } = await useState(prisma);

  const createCustomer = async () =>
    await prisma.customer.create({
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

  Array.from({ length: 120 }).forEach(async () => await createCustomer());
};
