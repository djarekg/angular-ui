import { StateSelect } from '@/components/state-select/state-select.js';
import { FormMode } from '@/core/constants/form-mode.js';
import { userSchema } from '@/features/users/forms';
import { CustomUserModel } from '@/features/users/forms/user.model.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { apply, Control, disabled, form, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserModel } from '@aui/api';

@Component({
  selector: 'app-user-detail',
  imports: [
    Control,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    ReactiveFormsModule,
    StateSelect,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetail {
  readonly #user = linkedSignal<CustomUserModel>(() => {
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
    } = this
      .user();

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
  readonly save = output<CustomUserModel>();

  protected readonly isEditing = computed(() => this.mode() !== FormMode.view);
  protected readonly isNew = computed(() => this.mode() === FormMode.new);
  protected readonly form = form(this.#user, path => {
    apply(path, userSchema);
    disabled(path, () => !this.isEditing());
  });

  protected onCancel() {
    this.cancel.emit();
  }

  protected onEdit() {
    this.edit.emit();
  }

  protected onNew() {
    this.new.emit();
  }

  protected async onSave(e: Event) {
    e.preventDefault();

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
