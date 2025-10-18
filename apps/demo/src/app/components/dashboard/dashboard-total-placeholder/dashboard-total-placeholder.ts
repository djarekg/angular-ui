import { DashboardBaseType } from '@/components/dashboard/types';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-total-placeholder',
  imports: [],
  templateUrl: './dashboard-total-placeholder.html',
  styleUrl: './dashboard-total-placeholder.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTotalPlaceholder {
  static readonly type = DashboardBaseType.total;
  readonly label = input('');

  protected readonly canvas = viewChild<HTMLCanvasElement>('#chart');

  constructor() {
    afterNextRender({
      write: () => {
        const canvas = this.canvas();
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
          const width = (canvas.width = window.innerWidth);
          const height = (canvas.height = window.innerHeight);
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = 'red';
          ctx.fillRect(50, 50, 100, 150);
          ctx.fillStyle = 'green';
          ctx.fillRect(75, 75, 100, 100);
          ctx.fillStyle = 'rgb(255 0 255 / 75%)';
          ctx.fillRect(25, 100, 175, 50);
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 5;
          ctx.strokeRect(25, 25, 175, 200);
        }
      },
    });
  }
}
