import {
  DashboardProductTypesTotalSalesByMonth,
  DashboardTopSellers,
  DashboardTopSellingProductTypes,
  DashboardTotalQuantitySold,
  DashboardTotalSales,
} from '@/features/dashboards/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [
    DashboardTopSellers,
    DashboardTopSellingProductTypes,
    DashboardTotalSales,
    DashboardTotalQuantitySold,
    DashboardProductTypesTotalSalesByMonth,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Home {}
