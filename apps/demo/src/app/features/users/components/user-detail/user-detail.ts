import { Form, FormCard } from '@/components/form';
import { GenderSelect } from '@/components/select';
import { StateSelect } from '@/components/select/state-select/state-select.js';
import { FormMode } from '@/core/constants/form-mode.js';
import { userSchema } from '@/features/users/forms';
import { type UserFormModel } from '@/features/users/forms/user-form.model.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { apply, disabled, Field, form, submit } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { type UserModel } from '@aui/api';

@Component({
  selector: 'app-user-detail',
  imports: [
    Field,
    Form,
    FormCard,
    FormsModule,
    GenderSelect,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    StateSelect,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'has-active',
  },
})
export class UserDetail {
  readonly #user = linkedSignal<UserFormModel>(() => {
    const {
      id,
      firstName,
      lastName,
      gender,
      email,
      phone,
      streetAddress,
      streetAddress2,
      city,
      stateId,
      zip,
      isActive,
    } = this.user();

    return {
      id,
      firstName,
      lastName,
      gender,
      email,
      phone,
      streetAddress,
      streetAddress2: streetAddress2 ?? '',
      city,
      stateId,
      zip,
      isActive,
    };
  });

  readonly user = input.required<UserModel>();
  readonly mode = input<FormMode>(FormMode.view);
  readonly cancel = output();
  readonly edit = output();
  readonly new = output();
  readonly save = output<UserFormModel>();

  protected readonly isEditing = computed(() => this.mode() !== FormMode.view);
  protected readonly readonly = computed(() => this.mode() === FormMode.new);
  protected readonly form = form(this.#user, path => {
    apply(path, userSchema);
    disabled(path, () => !this.isEditing());
  });

  protected onFormChange(mode: FormMode) {
    switch (mode) {
      case FormMode.cancel:
        this.cancel.emit();
        break;
      case FormMode.edit:
        this.edit.emit();
        break;
      case FormMode.new:
        this.new.emit();
        break;
      case FormMode.save:
        this.onSave();
        break;
    }
  }

  protected async onSave() {
    // eslint-disable-next-line @typescript-eslint/require-await
    await submit(this.form, async f => {
      try {
        this.save.emit(f().value());
      } catch (err) {
        console.error('Failed to save customer', err);

        return [
          {
            kind: 'customer-update-failed',
            message: 'Failed to save customer.',
          },
        ];
      }

      return [];
    });
  }
}
