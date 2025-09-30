import { TopSellingModel } from '@/features/dashboards/models';
import { DashboardService } from '@/features/dashboards/services/dashboard.service.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard-top-selling',
  imports: [
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    TitleCasePipe,
  ],
  templateUrl: './dashboard-top-selling.html',
  styleUrl: './dashboard-top-selling.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTopSelling {
  readonly #service = inject(DashboardService);

  readonly defaultValue = input<TopSellingModel[]>([]);
  readonly label = input.required<string>();
  readonly type = input.required<DashboardType>();

  protected readonly isTopFive = signal(true);

  protected readonly resource = resource({
    defaultValue: this.defaultValue(),
    loader: () => this.#service.get<TopSellingModel[]>(this.type(), new Date().getFullYear()),
  });

  protected readonly filtered = computed(() => {
    const value = this.resource.value();

    if (this.isTopFive()) return value.slice(0, 5);

    return value;
  });
}
