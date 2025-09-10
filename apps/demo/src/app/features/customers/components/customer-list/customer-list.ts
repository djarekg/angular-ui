import { Spinner } from '@/components/spinner/spinner';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CustomerModel } from '@aui/api';

@Component({
  selector: 'app-customer-list',
  imports: [
    DatePipe,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    RouterLink,
    Spinner,
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-loader',
  },
})
export class CustomerList {
  readonly customers = input.required<CustomerModel[]>();

  protected readonly columnsToDisplay = [
    'name',
    'city',
    'stateId',
    'dateCreated',
    'isActive',
    'view',
  ];
  protected readonly dataSource = new MatTableDataSource<CustomerModel>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.customers() ?? [];
    });
  }
}
