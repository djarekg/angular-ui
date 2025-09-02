import { AuthService } from '@/core/auth/auth.service.js';
import { isNullOrEmpty } from '@/core/utils/string.js';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const ERROR_MSG_SIGNIN_FAILED = 'Failed to login with username and password';

@Component({
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SigninComponent {
  protected readonly authService = inject(AuthService);
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  protected async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.value;

    if (isNullOrEmpty(username) || isNullOrEmpty(password)) {
      return;
    }

    this.isSubmitting.set(true);

    const success = await this.authService.signin(username!, password!);

    this.isSubmitting.set(false);

    if (success) {
      this.errorMessage.set(null);
    }
    else {
      this.errorMessage.set(ERROR_MSG_SIGNIN_FAILED);
    }
  }
}
