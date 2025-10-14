import { ApiService } from '@/core/api/api.service.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { inject, Injectable } from '@angular/core';
import { MonthTotalModel, ProductType } from '@aui/api';

export const DashboardApi = {
  [DashboardType.topSellers]: 'top-sellers',
  [DashboardType.topSellingProductTypes]: 'top-selling-product-types',
  [DashboardType.totalQuantitySold]: 'total-quantity-sold',
  [DashboardType.totalSales]: 'total-sales',
  [DashboardType.totalSalesByMonth]: 'total-sales-by-month',
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly #api = inject(ApiService);

  get = <T = unknown>(type: DashboardType, year: number) =>
    this.#api.get<T>(`/dashboard/${DashboardApi[type]}/${year}`);

  getProductTypeTotalSalesByMonth = (type: ProductType, year: number) =>
    this.#api.get<MonthTotalModel>(`/dashboard/product-type-total-sales-by-month/${type}/${year}`);
}
