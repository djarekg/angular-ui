import { CustomerList } from '@/features/customers/components/customer-list/customer-list.js';
import { CustomerService } from '@/features/customers/services';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';

@Component({
  selector: 'app-customers',
  imports: [CustomerList],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomersContainer {
  readonly #service = inject(CustomerService);

  protected readonly resource = resource({
    loader: () => this.#service.getCustomers(),
  });
}
