import type { PrismaClient } from '#app/prisma/client/index.js';
import { Role } from '../../src/constants/role.ts';
import { faker } from './faker-context.ts';
import { useState } from './state.ts';

export const createUsers = async (prisma: PrismaClient) => {
  console.group('Seeding users');

  const { randomStateId } = await useState(prisma);

  const createAdminUser = () =>
    prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@fu.com',
        streetAddress: '123 Admin St',
        city: 'St. Augustine',
        stateId: randomStateId(),
        zip: '32084',
        phone: '123-456-7890',
        roleId: Role.Admin,
        password: 'admin',
        // password: Bun.password.hashSync('admin'),
      },
    });

  const createUser = () =>
    prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        streetAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        stateId: randomStateId(),
        zip: faker.location.zipCode(),
        phone: faker.phone.number(),
        roleId: Role.User,
        password: faker.internet.password(),
        // password: generateHash(faker.internet.password()),
      },
    });

  const createSalesUser = () =>
    prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        streetAddress: faker.location.streetAddress(),
        streetAddress2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        stateId: randomStateId(),
        zip: faker.location.zipCode(),
        phone: faker.phone.number(),
        roleId: Role.Sales,
        password: faker.internet.password(),
        // password: Bun.password.hashSync(faker.internet.password()),
      },
    });

  const createAccountingUser = () =>
    prisma.user.create({
      data: {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        streetAddress: faker.location.streetAddress(),
        streetAddress2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        stateId: randomStateId(),
        zip: faker.location.zipCode(),
        phone: faker.phone.number(),
        roleId: Role.Accounting,
        password: faker.internet.password(),
        // password: Bun.password.hashSync(faker.internet.password()),
      },
    });

  console.log('Adding admin user...');
  await createAdminUser();

  console.log('Adding user users...');
  Array.from({ length: 10 }).forEach(async () => await createUser());

  console.log('Adding sales users...');
  Array.from({ length: 10 }).forEach(async () => await createSalesUser());

  console.log('Adding accounting users...');
  Array.from({ length: 5 }).forEach(async () => await createAccountingUser());

  console.groupEnd();
};
