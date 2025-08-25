import { StateSelectComponent } from '@/components/state-select/state-select.component.js';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '@aui/api';

type UserForm = {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  streetAddress: FormControl<string | null>;
  streetAddress2: FormControl<string | null>;
  city: FormControl<string | null>;
  stateId: FormControl<string | null>;
  zip: FormControl<string | null>;
  roleId: FormControl<string | null>;
  isActive: FormControl<boolean | null>;
};

@Component({
  selector: 'app-user-detail',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    StateSelectComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  readonly user = input.required<User | undefined>();
  readonly save = output<User>();

  protected readonly isEditing = signal(false);
  protected readonly isSubmitting = signal(false);

  protected form = new FormGroup<UserForm>({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    streetAddress2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
    isActive: new FormControl(false, [Validators.required]),
  });

  constructor() {
    effect(() => {
      const user = this.user()!;

      if (user) {
        this.form.patchValue(user);
      }
      else {
        this.form.reset();
      }
    });

    effect(() => {
      if (this.isEditing()) {
        this.form.enable();
      }
      else {
        this.form.disable();
      }
    });
  }

  protected onEdit() {
    this.isEditing.set(true);
  }

  protected onCancel() {
    this.form.reset(this.user());
    this.isEditing.set(false);
  }

  protected onSave() {
    this.save.emit(this.form.value as User);
    this.isEditing.set(false);
  }
}
