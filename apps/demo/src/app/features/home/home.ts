import { DashboardTotalQuantitySold, DashboardTotalSales } from '@/features/dashboards/components';
import { DashboardTopSellers } from '@/features/dashboards/components/dashboard-top-sellers.js';
import { DashboardTopSellingProductTypes } from '@/features/dashboards/components/dashboard-top-selling-product-types.js';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [
    DashboardTopSellers,
    DashboardTopSellingProductTypes,
    DashboardTotalSales,
    DashboardTotalQuantitySold,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
}
