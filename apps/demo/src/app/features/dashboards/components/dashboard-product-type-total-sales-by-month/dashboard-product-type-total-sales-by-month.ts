import { DashboardType } from '@/features/dashboards/types/dashboard-type.js';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProductType } from '@aui/api';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

type CustomerChartEvent = {
  event?: ChartEvent;
  active?: object[];
};

@Component({
  selector: 'app-dashboard-product-type-total-sales-by-month',
  imports: [BaseChartDirective],
  templateUrl: './dashboard-product-type-total-sales-by-month.html',
  styleUrl: './dashboard-product-type-total-sales-by-month.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProductTypeTotalSalesByMonth {
  readonly type = input<DashboardType>(DashboardType.totalSaleByMonth);
  readonly productType = input.required<ProductType>();
  readonly totals = input.required<number[]>();

  protected chartType: ChartType = 'line';

  protected readonly data = computed<ChartConfiguration['data']>(() => ({
    datasets: [
      {
        data: this.totals(),
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  }));

  protected chartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },
    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         display: true,
      //         position: 'center',
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold',
      //         },
      //       },
      //     },
      //   ],
      // },
    },
  };

  protected chartClicked({ event, active }: CustomerChartEvent): void {
    console.log(event, active);
  }

  protected chartHovered({ event, active }: CustomerChartEvent): void {
    console.log(event, active);
  }
}
