import { DashboardBaseType } from '@/components/dashboard/types';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-total-amount-placeholder',
  imports: [],
  templateUrl: './dashboard-total-amount-placeholder.html',
  styleUrl: './dashboard-total-amount-placeholder.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTotalAmountPlaceholder {
  static readonly type = DashboardBaseType.totalAmount;
  readonly label = input('');
}
