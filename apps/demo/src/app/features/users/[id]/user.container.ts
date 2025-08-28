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
  readonly #userId = signal<string | null>(null);

  protected readonly mode = signal<FormMode>(FormMode.view);

  protected readonly userResource = resource({
    params: () => ({ id: this.#userId() }),
    loader: ({ params: { id } }) => {
      if (id && this.mode() === FormMode.view) {
        return this.#userService.getUser(id);
      }
      return Promise.resolve({} as User);
    },
  });

  constructor() {
    this.#route.queryParams.subscribe(params => {
      const mode = (Number(params['mode']) || FormMode.view) as FormMode;
      this.mode.set(mode);
    });

    this.#route.params.subscribe(params => {
      const id = params['id'] as string;
      this.#userId.set(id);
    });
  }

  protected onNew() {
    this.#navigateToUser(FormMode.new);
  }

  protected onEdit() {
    this.#navigateToUser(FormMode.edit);
  }

  protected onCancel() {
    this.#navigateToUser(FormMode.view);
  }

  protected async onSave(user: User) {
    if (this.mode() === FormMode.edit) {
      await this.#userService.updateUser(user);
    }
    else {
      const { id } = await this.#userService.createUser(user);
      this.#router.navigate(['/users', id]);
    }

    // Reset back mode
    this.mode.set(FormMode.view);

    this.#snackbar.open('User saved successfully', 'OK', {
      duration: 3000,
      panelClass: 'app-snackbar-success',
    });
  }

  #navigateToUser(mode: FormMode) {
    // If canceling creating new user, navigate back to users route.
    if (this.mode() === FormMode.new && mode === FormMode.view) {
      this.#router.navigate(['/users']);
      return;
    }

    if (mode === FormMode.new) {
      this.#router.navigate(['/users', 0], {
        queryParams: { mode: FormMode.new },
      });
      return;
    }

    const urlTree = this.#router.createUrlTree([], {
      relativeTo: this.#route,
      queryParams: {
        mode,
      },
      queryParamsHandling: 'merge',
    });

    this.#router.navigateByUrl(urlTree);
  }
}
