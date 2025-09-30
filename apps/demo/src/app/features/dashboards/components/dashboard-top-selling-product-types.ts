import { DashboardTopSelling } from '@/features/dashboards/components/dashboard-top-selling/dashboard-top-selling.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-top-selling-product-types',
  imports: [DashboardTopSelling],
  template: `
      <app-dashboard-top-selling [type]="type" label="Top Sellers" />
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopSellingProductTypes {
  protected readonly type = DashboardType.topSellingProductTypes;
}
