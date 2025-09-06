import { CustomerDetail } from '@/features/customers/components/customer-detail/customer-detail.js';
import { CustomerService } from '@/features/customers/services/customer.service.js';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [CustomerDetail],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomerContainer {
  readonly #service = inject(CustomerService);
  readonly #id = signal(inject(ActivatedRoute).snapshot.params['id']);

  protected readonly resource = resource({
    params: () => ({ id: this.#id() }),
    loader: ({ params: { id } }) => this.#service.getCustomer(id),
  });
}
