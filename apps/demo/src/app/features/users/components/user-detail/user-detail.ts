import { StateSelect } from '@/components/state-select/state-select.js';
import { FormMode } from '@/core/constants/form-mode.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '@aui/api';

type UserForm = {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  streetAddress: FormControl<string | null>;
  streetAddress2: FormControl<string | null>;
  city: FormControl<string | null>;
  stateId: FormControl<string | null>;
  zip: FormControl<string | null>;
  isActive: FormControl<boolean | null>;
};

@Component({
  selector: 'app-user-detail',
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    StateSelect,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetail {
  readonly mode = input<FormMode>();
  readonly user = input.required<UserModel | undefined>();
  readonly new = output();
  readonly edit = output();
  readonly cancel = output();
  readonly save = output<UserModel>();

  protected readonly isEditing = linkedSignal(() => this.mode() !== FormMode.view);
  protected readonly isNew = computed(() => this.mode() === FormMode.new);
  protected readonly isSubmitting = signal(false);

  protected form = new FormGroup<UserForm>({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    streetAddress2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
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

  /**
   * IsActive button toggle is not working with ReactiveForms
   * for some reason. Couldn't find any open issues with the
   * component, so binding to value and patching form value
   * thru change event is the work around for now.
   */
  protected onIsActiveToggleChange(isActive: boolean) {
    this.form.patchValue({
      isActive,
    });
  }

  protected onNew() {
    this.new.emit();
  }

  protected onEdit() {
    this.edit.emit();
    this.isEditing.set(true);
  }

  protected onCancel() {
    this.form.reset(this.user() || {});
    this.cancel.emit();
    this.isEditing.set(false);
  }

  protected onSave() {
    this.save.emit({
      ...(this.form.value as UserModel),
      id: this.user()?.id!,
    });
    this.isEditing.set(false);
  }
}
