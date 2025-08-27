import { UserDetailComponent } from '@/components/user-detail/user-detail.component.js';
import { UserService } from '@/core/auth/user.service.js';
import { FormMode } from '@/core/constants/form-mode.js';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@aui/api';

@Component({
  selector: 'app-user',
  imports: [UserDetailComponent, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './user.container.html',
  styleUrl: './user.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserContainer {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  readonly #snackbar = inject(MatSnackBar);

  protected readonly mode = signal(
    (this.#route.snapshot.queryParamMap.get('mode') || FormMode.view) as FormMode,
  );

  protected readonly userResource = resource({
    loader: () => {
      if (this.mode() === FormMode.view) {
        const id = this.#route.snapshot.paramMap.get('id')!;
        return this.#userService.getUser(id);
      }
      return Promise.resolve({} as User);
    },
  });

  protected async onSave(user: User) {
    if (this.mode() === FormMode.edit) {
      await this.#userService.updateUser(user);
    }
    else {
      const { id } = await this.#userService.createUser(user);
      this.#router.navigate(['/users', id]);
    }

    this.userResource.reload();

    this.#snackbar.open('User saved successfully', 'OK', {
      duration: 3000,
      panelClass: 'app-snackbar-success',
    });
  }
}
