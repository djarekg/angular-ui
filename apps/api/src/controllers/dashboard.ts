import { prisma } from '#app/client/index.js';
import { getYearRange } from '#app/utils/date.js';
import type { Context } from 'koa';

export const getTopSellers = async (ctx: Context) => {
  const { params: { year } } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const totalSales = await prisma.productSale.groupBy({
      by: ['userId'],
      _sum: {
        price: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
      orderBy: {
        _sum: {
          price: 'desc',
        },
      },
    });

    const userIds = totalSales.map(({ userId }) => userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    const result = totalSales.map(({ _sum: { price }, userId }) => {
      const { firstName, lastName } = users.find(({ id }) => id === userId)!;

      return {
        id: userId,
        name: `${firstName} ${lastName}`,
        total: price,
      };
    });

    ctx.body = result;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch top sellers' };
    console.error('Failed to fetch top sellers', err);
  }
};

export const getTopSellingProductTypes = async (ctx: Context) => {
  const { params: { year } } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    // Load sales with product.productType included
    const productSales = await prisma.productSale.findMany({
      include: {
        product: {
          select: {
            productType: true,
          },
        },
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    // Aggregate totals by productType (sum of quantity * price)
    const totalsByType = productSales.reduce<Record<string, number>>((acc, sale) => {
      const productType = sale.product?.productType ?? 'Unknown';
      const qty = Number(sale.quantity ?? 0);
      const price = Number(sale.price ?? 0);
      acc[productType] = (acc[productType] || 0) + qty * price;
      return acc;
    }, {});

    // Convert to array and sort descending by total
    const result = Object.entries(totalsByType)
      .map(([productType, total]) => ({ id: productType, name: productType, total }))
      .sort((a, b) => b.total - a.total);

    ctx.body = result;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch top selling product types' };
    console.error('Failed to fetch top selling product types', err);
  }
};

export const getTotalSales = async (ctx: Context) => {
  const { params: { year } } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const sales = await prisma.productSale.findMany({
      select: {
        quantity: true,
        price: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    // calculate sales by multiplying qty * price and summing the result
    const totalSales = sales.reduce((acc, item) => {
      const q = Number(item.quantity ?? 0);
      const p = Number(item.price ?? 0);
      return acc + q * p;
    }, 0);

    ctx.body = { total: totalSales };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total sales' };
    console.error('Failed to fetch total sales', err);
  }
};

export const getTotalQuantitySold = async (ctx: Context) => {
  const { params: { year } } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const { _sum } = await prisma.productSale.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    ctx.body = { total: _sum.quantity };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total quantity sold' };
    console.error('Failed to fetch total quantity sold', err);
  }
};

export const getTotalSalesByMonth = async (ctx: Context) => {
  const { params: { year } } = ctx;
  const { startOfYear, startOfNextYear } = getYearRange(Number(year));

  try {
    const sales = await prisma.productSale.findMany({
      select: {
        quantity: true,
        price: true,
        dateCreated: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    // calculate sales by multiplying qty * price and summing the result
    const salesByMonth = sales.reduce((acc, item) => {
      const q = Number(item.quantity ?? 0);
      const p = Number(item.price ?? 0);
      const date = item.dateCreated;
      if (date) {
        const month = date.getUTCMonth(); // getUTCMonth returns month index (0-11)
        acc[month] = (acc[month] || 0) + q * p;
      }
      return acc;
    }, {} as Record<number, number>);

    // Convert to array of { month, total } objects for each month (0-11)
    const result = Array.from({ length: 12 }, (_, month) => ({
      month,
      total: salesByMonth[month] || 0,
    }));

    ctx.body = result;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total quantity sold' };
    console.error('Failed to fetch total quantity sold', err);
  }
};
