import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardTopSelling } from './dashboard-top-selling/dashboard-top-selling';

@Component({
  selector: 'app-dashboard-top-sellers',
  imports: [DashboardTopSelling],
  template: `
    <app-dashboard-top-selling [type]="type" label="Top Sellers" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopSellers {
  protected readonly type = DashboardType.topSellers;
}
