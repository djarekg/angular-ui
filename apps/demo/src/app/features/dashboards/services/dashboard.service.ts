import { ApiService } from '@/core/api/api.service.js';
import { TotalModel } from '@/features/dashboards/models/total.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { inject, Injectable } from '@angular/core';

export const DashboardApi = {
  [DashboardType.topSellers]: 'top-sellers',
  [DashboardType.topSellingProductTypes]: 'top-selling-product-types',
  [DashboardType.totalQuantitySold]: 'total-quantity-sold',
  [DashboardType.totalSales]: 'total-sales',
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly #api = inject(ApiService);

  get = (type: DashboardType, year: number) =>
    this.#api.get<TotalModel>(`/dashboard/${DashboardApi[type]}/${year}`);
}
