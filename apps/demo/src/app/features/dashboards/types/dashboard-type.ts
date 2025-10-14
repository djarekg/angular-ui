export const DashboardType = {
  totalSales: 1,
  totalQuantitySold: 2,
  topSellingProductTypes: 3,
  topSellers: 4,
  productTypeTotalSaleByMonth: 5,
  totalSalesByMonth: 6,
};

export type DashboardType = (typeof DashboardType)[keyof typeof DashboardType];
