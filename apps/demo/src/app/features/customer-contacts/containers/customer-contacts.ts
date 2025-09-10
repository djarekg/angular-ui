import { Spinner } from '@/components/spinner/spinner';
import CustomerContactList from '@/features/customer-contacts/components/customer-contact-list/customer-contact-list.js';
import { CustomerContact } from '@/features/customer-contacts/services/customer-contact.service.js';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { CustomerContactModel } from '@aui/api';

@Component({
  selector: 'app-customer-contacts',
  imports: [CustomerContactList, Spinner],
  templateUrl: './customer-contacts.html',
  styleUrl: './customer-contacts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-loader',
  },
})
export default class CustomerContacts {
  readonly #route = inject(ActivatedRoute);
  readonly #service = inject(CustomerContact);

  readonly #customerId = this.#route.snapshot.paramMap.get('id')
    ?? this.#route.parent?.snapshot.paramMap.get('id')
    ?? undefined;

  protected readonly resource = resource<CustomerContactModel[], string | undefined>({
    defaultValue: [],
    params: () => this.#customerId,
    loader: ({ params: id }) => this.#service.getForCustomer(id),
  });
}
