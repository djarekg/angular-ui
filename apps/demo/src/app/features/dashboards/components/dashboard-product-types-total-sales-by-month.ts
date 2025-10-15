import { ProductTypeSelectType } from '@/components/select/product-type-select/product-type-select.js';
import { DashboardTotalSales } from '@/features/dashboards/components/dashboard-total-sales/dashboard-total-sales.js';
import { DashboardService } from '@/features/dashboards/services/dashboard.service.js';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { ProductType } from '@aui/api';

@Component({
  selector: 'app-dashboard-product-types-total-sales-by-month',
  imports: [DashboardTotalSales],
  template: `
    <!-- <app-product-type-select (valueChange)="onProductTypeChange($event)" /> -->
    <app-dashboard-total-sales
      title="Product Type Sales by Month"
      [totals]="resource.value()" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProductTypesTotalSalesByMonth {
  readonly #service = inject(DashboardService);

  protected readonly productType = signal<ProductType>(ProductType.DRESS);

  protected readonly resource = resource({
    params: () => this.productType(),
    loader: ({ params }) =>
      this.#service.getProductTypeTotalSalesByMonth(params, new Date().getFullYear()),
  });

  protected onProductTypeChange(value: ProductTypeSelectType) {
    this.productType.set(value as ProductType);
  }
}
