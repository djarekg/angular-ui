import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '@aui/api';

@Component({
  selector: 'app-customer-list',
  imports: [DatePipe, MatIconModule, MatTableModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerList {
  readonly customers = input.required<Customer[]>();

  protected readonly columnsToDisplay = ['name', 'city', 'stateId', 'isActive', 'dateCreated'];
  protected readonly dataSource = new MatTableDataSource<Customer>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.customers() ?? [];
    });
  }
}
