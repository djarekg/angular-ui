import { StateSelect } from '@/components/select/state-select/state-select.js';
import { FormMode } from '@/core/constants/form-mode.js';
import { AppCustomerModel } from '@/features/customers/forms/customer.model.js';
import { customerSchema } from '@/features/customers/forms/customer.schema.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { apply, Control, disabled, form, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomerModel } from '@aui/api';

@Component({
  selector: 'app-customer-detail',
  imports: [
    Control,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    StateSelect,
  ],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'has-active',
  },
})
export class CustomerDetail {
  readonly #customer = linkedSignal<AppCustomerModel>(() => {
    const { name, phone, streetAddress, streetAddress2, city, stateId, zip, isActive } = this
      .customer();

    return {
      name,
      phone,
      streetAddress,
      streetAddress2: streetAddress2 ?? '',
      city,
      stateId,
      zip,
      isActive,
    };
  });

  readonly customer = input.required<CustomerModel>();
  readonly mode = input<FormMode>(FormMode.view);
  readonly cancel = output();
  readonly edit = output();
  readonly save = output<AppCustomerModel>();

  protected readonly isEditing = computed(() => this.mode() === FormMode.edit);
  protected readonly form = form(this.#customer, path => {
    apply(path, customerSchema);
    disabled(path, () => this.mode() === FormMode.view);
  });

  protected onCancel() {
    this.cancel.emit();
  }

  protected onEdit() {
    this.edit.emit();
  }

  protected async onSave() {
    await submit(this.form, async form => {
      try {
        this.save.emit(form().value());
      }
      catch (err) {
        console.error('Failed to save customer', err);

        return [{
          kind: 'customer-update-failed',
          message: 'Failed to save customer.',
        }];
      }

      return [];
    });
  }
}
