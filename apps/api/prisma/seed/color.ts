import type { PrismaClient } from '#app/prisma/client/index.js';

export const createColors = async (prisma: PrismaClient) => {
  console.group('Seeding colors...');

  const colors = [
    { name: 'Black' },
    { name: 'Blue' },
    { name: 'Brown' },
    { name: 'Camo ' },
    { name: 'Cyan' },
    { name: 'Gray' },
    { name: 'Green' },
    { name: 'Magenta' },
    { name: 'Orange' },
    { name: 'Pink' },
    { name: 'Purple' },
    { name: 'Red' },
    { name: 'White' },
    { name: 'Yellow' },
  ];

  const createColor = (color: { name: string }) =>
    prisma.color.create({
      data: {
        name: color.name,
      },
    });

  console.log('Adding colors...');
  await Promise.all(colors.map((color) => createColor(color)));

  console.groupEnd();
};
