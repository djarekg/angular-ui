import { UserDetailComponent } from '@/components/user-detail/user-detail.component.js';
import { UserService } from '@/core/auth/user.service.js';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
  readonly #userService = inject(UserService);
  readonly #snackbar = inject(MatSnackBar);

  protected readonly userResource = resource({
    loader: () => this.#userService.getUser(this.#route.snapshot.paramMap.get('id')!),
  });

  protected async onSave(user: User) {
    await this.#userService.updateUser(user);
    this.userResource.reload();
    this.#snackbar.open('User saved successfully', 'OK', {
      duration: 3000,
      panelClass: 'app-snackbar-success',
    });
  }
}
