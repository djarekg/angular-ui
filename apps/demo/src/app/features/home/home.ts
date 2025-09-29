import { DashboardTotalQuantitySold, DashboardTotalSales } from '@/features/dashboards/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [DashboardTotalSales, DashboardTotalQuantitySold],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
}
