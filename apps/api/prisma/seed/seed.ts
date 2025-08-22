import { PrismaClient } from '#app/prisma/client/index.js';
import { createColors } from '#app/prisma/seed/color.js';
import { createProductColors } from '#app/prisma/seed/product-color.js';
import { createProductInventories } from '#app/prisma/seed/product-inventory.js';
import { createProductSales } from '#app/prisma/seed/product-sale.js';
import { createProductTypes } from '#app/prisma/seed/product-type.js';
import { createProducts } from '#app/prisma/seed/product.js';
import { createRoles } from '#app/prisma/seed/role.js';
import { createCustomerContacts } from './customer-contact.js';
import { createCustomers } from './customer.js';
import { createStates } from './state.js';
import { createUsers } from './user.js';

const prisma = new PrismaClient();

const load = async () => {
  await createColors(prisma);
  await createStates(prisma);
  await createRoles(prisma);
  await createUsers(prisma);
  await createCustomers(prisma);
  await createCustomerContacts(prisma);
  await createProductTypes(prisma);
  await createProducts(prisma);
  await createProductColors(prisma);
  await createProductInventories(prisma);
  await createProductSales(prisma);
};

load()
  .then(() => console.log('Seed completed'))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    // Disconnecting needs to wait at least 1 second to ensure all
    // operations are completed.
    setTimeout(async () => {
      await prisma.$disconnect();
    }, 1000);
  });
