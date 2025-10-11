import { DashboardService } from '@/features/dashboards/services/dashboard.service.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { ChangeDetectionStrategy, Component, inject, input, resource } from '@angular/core';
import { TotalSaleByMonthModel } from '@aui/api';
import { BaseChartDirective } from 'ng2-charts';

// const lineChartOptions: ChartConfiguration['options'] = {
//   elements: {
//     line: {
//       tension: 0.5,
//     },
//   },
// };

@Component({
  selector: 'app-dashboard-total-sales-by-month',
  imports: [BaseChartDirective],
  templateUrl: './dashboard-total-sales-by-month.html',
  styleUrl: './dashboard-total-sales-by-month.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTotalSalesByMonth {
  readonly #service = inject(DashboardService);

  readonly type = input.required<DashboardType>();

  protected readonly resource = resource({
    defaultValue: [] as TotalSaleByMonthModel[],
    loader: () => this.#service.get<TotalSaleByMonthModel[]>(this.type(), new Date().getFullYear()),
  });
}
