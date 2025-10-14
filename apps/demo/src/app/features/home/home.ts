import {
  DashboardProductTypesTotalSalesByMonth,
  DashboardTopSellers,
  DashboardTopSellingProductTypes,
  DashboardTotalQuantitySold,
  DashboardTotalSold,
} from '@/features/dashboards/components';
import { DashboardTotalSalesByMonth } from '@/features/dashboards/components/dashboard-total-sales-by-month.js';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [
    DashboardProductTypesTotalSalesByMonth,
    DashboardTopSellers,
    DashboardTopSellingProductTypes,
    DashboardTotalQuantitySold,
    DashboardTotalSalesByMonth,
    DashboardTotalSold,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Home {}
