import { TableSkeleton } from '@/components/skeleton/table-skeleton/table-skeleton.js';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CustomerContactModel } from '@aui/api';

@Component({
  selector: 'app-customer-contact-list',
  imports: [
    DatePipe,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    RouterLink,
    TableSkeleton,
  ],
  templateUrl: './customer-contact-list.html',
  styleUrl: './customer-contact-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-loader',
  },
})
export default class CustomerContactList {
  readonly items = input.required<CustomerContactModel[]>();

  protected readonly columnsToDisplay = [
    'firstName',
    'lastName',
    'city',
    'stateId',
    'dateCreated',
    'isActive',
    'view',
  ];
  protected readonly dataSource = new MatTableDataSource<CustomerContactModel>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }
}
