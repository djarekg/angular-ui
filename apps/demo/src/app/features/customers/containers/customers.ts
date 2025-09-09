import { CustomerList } from '@/features/customers/components/customer-list/customer-list.js';
import { CustomerService } from '@/features/customers/services';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customers',
  imports: [CustomerList, MatProgressSpinnerModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-loader',
  },
})
export default class Customers {
  readonly #service = inject(CustomerService);

  protected readonly resource = resource({
    defaultValue: [],
    loader: () => this.#service.getCustomers(),
  });
}
