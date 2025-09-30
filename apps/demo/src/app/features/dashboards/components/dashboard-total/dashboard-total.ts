import { TotalModel } from '@/features/dashboards/models';
import { DashboardService } from '@/features/dashboards/services/dashboard.service.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { CurrencyPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotalType } from './total-type.js';

@Component({
  selector: 'app-dashboard-total',
  imports: [CurrencyPipe, DecimalPipe, MatButtonModule, MatIconModule, TitleCasePipe],
  templateUrl: './dashboard-total.html',
  styleUrl: './dashboard-total.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardTotal {
  readonly #service = inject(DashboardService);

  readonly defaultValue = input<TotalModel>({ total: 0 });
  readonly label = input.required<string>();
  readonly type = input.required<DashboardType>();
  readonly totalType = input<TotalType>(TotalType.int);

  protected readonly icon = computed(() => {
    switch (this.totalType()) {
      case TotalType.currency:
        return 'attach_money';
      case TotalType.int:
        return 'layers';
    }
  });

  protected readonly resource = resource({
    defaultValue: this.defaultValue(),
    loader: () => this.#service.get<TotalModel>(this.type(), new Date().getFullYear()),
  });
}
