import { MonthsAbbr } from '@/core/constants/months.js';
import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
} from '@angular/core';
import { MonthTotalModel, ProductType } from '@aui/api';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

type CustomerChartEvent = {
  event?: ChartEvent;
  active?: object[];
};

@Component({
  selector: 'app-dashboard-product-type-total-sales-by-month',
  imports: [BaseChartDirective, CurrencyPipe],
  templateUrl: './dashboard-product-type-total-sales-by-month.html',
  styleUrl: './dashboard-product-type-total-sales-by-month.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProductTypeTotalSalesByMonth {
  readonly #locale = inject(LOCALE_ID);
  readonly type = input<DashboardType>(DashboardType.totalSaleByMonth);
  readonly productType = input.required<ProductType>();
  readonly totals = input.required<MonthTotalModel | undefined>();

  protected chartType: ChartType = 'line';

  protected readonly data = computed<ChartConfiguration['data']>(() => {
    const totals = this.totals();

    if (!totals) {
      return {
        datasets: [],
        labels: [],
      };
    }

    const labels = Object.keys(totals).map(month => MonthsAbbr[Number(month)]);
    const data = Object.values(totals);

    return {
      datasets: [
        {
          data,
          backgroundColor: 'hsla(265, 99%, 56%, 0.1)',
          borderColor: 'hsla(265, 99%, 56%, 1)',
          pointBackgroundColor: 'hsla(216, 100%, 58%, 1)',
          pointBorderColor: 'hsla(216, 100%, 58%, 1)',
          pointHoverBackgroundColor: 'hsla(216, 100%, 58%, 0.5)',
          pointHoverBorderColor: 'hsla(216, 100%, 58%, 1)',
          fill: 'origin',
          normalized: true,
          weight: '500',
        },
      ],
      labels,
    };
  });

  protected chartOptions: ChartConfiguration['options'] = {
    normalized: true,
    elements: {
      line: {
        tension: 0.2,
        borderWidth: 1,
      },
      point: {
        backgroundColor: 'red',
        hoverBackgroundColor: 'green',
        radius: 3,
        pointStyle: 'circle',
        hoverRadius: 10,
        hoverBorderWidth: 3,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        grid: {
          color: 'hsla(0, 0%, 85%, 1)',
          lineWidth: 0.3,
        },
        ticks: {
          color: 'hsla(0, 0%, 85%, 1)',
          callback: value => formatCurrency(Number(value), this.#locale, '$', 'USD', '1.0'),
        },
        animate: true,
        beginAtZero: true,
      },
      y1: {
        position: 'right',
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
      },
    },
  };

  protected chartClicked({ event, active }: CustomerChartEvent): void {
    console.log(event, active);
  }

  protected chartHovered({ event, active }: CustomerChartEvent): void {
    console.log(event, active);
  }
}
