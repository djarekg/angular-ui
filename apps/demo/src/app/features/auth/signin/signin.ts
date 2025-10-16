import { AuthService } from '@/core/auth/auth.service.js';
import { type SigninModel } from '@/features/auth/signin/signin.model.js';
import { signinSchema } from '@/features/auth/signin/signin.schema.js';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { customError, Field, form, submit, type ValidationError } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const ERROR_MSG_SIGNIN_FAILED = 'Failed to login with username and password';

@Component({
  selector: 'app-signin',
  imports: [Field, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Signin {
  protected readonly authService = inject(AuthService);
  protected readonly errorMessage = signal<string | null>(null);

  readonly #signinModel = signal<SigninModel>({
    username: '',
    password: '',
  });

  protected readonly form = form(this.#signinModel, signinSchema);

  protected async onSubmit(e: Event) {
    e?.preventDefault();

    await submit(this.form, async f => {
      const errors: ValidationError[] = [];
      const { username, password } = f().value();

      try {
        await this.authService.signin(username, password);
      } catch (err) {
        console.error(ERROR_MSG_SIGNIN_FAILED, err);

        this.errorMessage.set(ERROR_MSG_SIGNIN_FAILED);

        errors.push(
          customError({
            field: f,
            error: {
              kind: 'authenticationError',
              message: ERROR_MSG_SIGNIN_FAILED,
            },
          })
        );
      }

      this.errorMessage.set(null);

      return errors;
    });
  }
}
