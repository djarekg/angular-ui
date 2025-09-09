import CustomerContactList from '@/features/customer-contacts/components/customer-contact-list/customer-contact-list.js';
import { CustomerContact } from '@/features/customer-contacts/services/customer-contact.service.js';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customer-contacts',
  imports: [CustomerContactList, MatProgressSpinnerModule],
  templateUrl: './customer-contacts.html',
  styleUrl: './customer-contacts.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-loader',
  },
})
export default class CustomerContacts {
  readonly #service = inject(CustomerContact);

  protected readonly resource = resource({
    defaultValue: [],
    loader: () => this.#service.get(),
  });
}
