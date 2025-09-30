import { TotalType } from '@/features/dashboards/components/dashboard-total/total-type.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import DashboardTotal from './dashboard-total/dashboard-total.js';

@Component({
  selector: 'app-dashboard-total-sales',
  imports: [DashboardTotal],
  template: `
    <app-dashboard-total [type]="type" [totalType]="totalType" label="Total Sales" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTotalSales {
  protected readonly type = DashboardType.totalSales;
  protected readonly totalType = TotalType.currency;
}
