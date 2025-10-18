export const DashboardBaseType = {
  totalAmount: 1,
  topSellers: 2,
  total: 3,
};

export type DashboardBaseType = (typeof DashboardBaseType)[keyof typeof DashboardBaseType];
