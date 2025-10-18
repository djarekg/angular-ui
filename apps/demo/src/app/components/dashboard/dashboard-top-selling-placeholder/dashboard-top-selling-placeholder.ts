import { DashboardBaseType } from '@/components/dashboard/types';
import { randomNum } from '@/core/utils';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-top-selling-placeholder',
  imports: [],
  templateUrl: './dashboard-top-selling-placeholder.html',
  styleUrl: './dashboard-top-selling-placeholder.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopSellingPlaceholder {
  static readonly type = DashboardBaseType.topSellers;
  readonly label = input('');
  protected readonly randomNum = randomNum; // Make randomNum function accessible to the template.
}
