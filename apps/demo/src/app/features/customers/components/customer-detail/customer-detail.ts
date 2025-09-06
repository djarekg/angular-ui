import { StateSelect } from '@/components/state-select/state-select.js';
import { CustomerModel } from '@/features/customers/forms/customer.model.js';
import { customerSchema } from '@/features/customers/forms/customer.schema.js';
import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';
import { Control, form } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '@aui/api';

@Component({
  selector: 'app-customer-detail',
  imports: [Control, MatInputModule, StateSelect],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDetail {
  readonly customer = input.required<Customer>();

  readonly #customer = linkedSignal<CustomerModel>(() => {
    const { name, phone, streetAddress, streetAddress2, city, stateId, zip, isActive } = this
      .customer();

    return {
      name,
      phone,
      streetAddress,
      streetAddress2: streetAddress2 || '',
      city,
      stateId,
      zip,
      isActive,
    };
  });

  protected readonly form = form(this.#customer, customerSchema);
}
