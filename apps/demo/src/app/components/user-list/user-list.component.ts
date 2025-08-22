import { UserService } from '@/core/auth/user.service.js';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [MatCardModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  protected readonly usersResource = resource({
    loader: this.#userService.getUsers,
  });

  protected onCardClick(id: string) {
    this.#router.navigate([`/users/${id}`]);
  }
}
