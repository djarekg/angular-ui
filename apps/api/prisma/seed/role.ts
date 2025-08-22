import { Role } from '#app/index.js';
import type { PrismaClient } from '#app/prisma/client/index.js';

export const createRoles = async (prisma: PrismaClient) => {
  console.group('Seeding roles...');

  const roles = Object.keys(Role);

  const createRole = ({ id, name }: { id: string; name: string; }) =>
    prisma.role.create({
      data: {
        id,
        name,
      },
    });

  console.log('Adding roles...');
  // @ts-ignore property access using index
  await Promise.all(roles.map(key => createRole({ id: Role[key], name: key })));

  console.groupEnd();
};
