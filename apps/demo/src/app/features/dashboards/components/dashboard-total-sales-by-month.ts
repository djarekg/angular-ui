import { DashboardTotalSales } from '@/features/dashboards/components/dashboard-total-sales/dashboard-total-sales.js';
import { DashboardService } from '@/features/dashboards/services/dashboard.service.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { MonthTotalModel } from '@aui/api';

@Component({
  selector: 'app-dashboard-total-sales-by-month',
  imports: [DashboardTotalSales],
  template: `
    <app-dashboard-total-sales
      title="Total Sales by Month"
      [totals]="resource.value()" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTotalSalesByMonth {
  readonly #service = inject(DashboardService);

  protected readonly resource = resource({
    loader: () =>
      this.#service.get<MonthTotalModel>(DashboardType.totalSalesByMonth, new Date().getFullYear()),
  });
}
