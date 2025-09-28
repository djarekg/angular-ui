import { CustomerList } from '@/features/customers/components/customer-list/customer-list.js';
import { CustomerService } from '@/features/customers/services';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';

@Component({
  selector: 'app-customers',
  imports: [CustomerList],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-loader',
  },
})
export default class Customers {
  readonly #service = inject(CustomerService);

  protected readonly filter = signal('');

  protected readonly resource = resource({
    defaultValue: [],
    loader: () => this.#service.getCustomers(),
  });

  protected onFilter(value: string) {
    this.filter.set(value);
  }
}
