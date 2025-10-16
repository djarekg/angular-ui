import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import {
  CdkDrag,
  type CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

type DashboardWidget = {
  id: string;
  name: string;
  description: string;
  type: DashboardType;
};

const WIDGETS = [
  {
    id: DashboardType.productTypeTotalSaleByMonth.toString(),
    name: 'Product type total sales by month',
    description: 'List product type sales total by month for the previous year',
    type: DashboardType.productTypeTotalSaleByMonth,
  },
  {
    id: DashboardType.topSellers.toString(),
    name: 'Top sellers',
    description: 'List top sellers for the previous year',
    type: DashboardType.topSellers,
  },
  {
    id: DashboardType.topSellingProductTypes.toString(),
    name: 'Top selling product types',
    description: 'List the top selling product for the previous year',
    type: DashboardType.topSellingProductTypes,
  },
  {
    id: DashboardType.totalQuantitySold.toString(),
    name: 'Total quantity sold',
    description: 'The total quantity sold for the previous year',
    type: DashboardType.totalQuantitySold,
  },
  {
    id: DashboardType.totalSales.toString(),
    name: 'Total sales',
    description: 'The total sales for the previous year',
    type: DashboardType.totalSales,
  },
  {
    id: DashboardType.totalSalesByMonth.toString(),
    name: 'Total sales month',
    description: 'The total sales of all products for the previous year',
    type: DashboardType.totalSalesByMonth,
  },
] satisfies DashboardWidget[];

@Component({
  selector: 'app-dashboard-widget-select',
  imports: [CdkDropList, CdkDrag, MatGridListModule, MatListModule],
  templateUrl: './dashboard-widget-select.html',
  styleUrl: './dashboard-widget-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetSelect {
  protected readonly unselected = signal<DashboardWidget[]>(WIDGETS);
  protected readonly selected = signal<DashboardWidget[]>([]);

  protected drop(event: CdkDragDrop<DashboardWidget[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  protected selectedDrop(event: CdkDragDrop<DashboardWidget[]>) {
    moveItemInArray(this.selected(), event.previousIndex, event.currentIndex);
  }
}
