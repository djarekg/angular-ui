import { UserService } from '@/core/auth/user.service.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule, MatCardModule, MatButtonToggleModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  readonly #usersResource = resource({
    loader: this.#userService.getUsers,
  });

  protected readonly usersActiveFilter = signal<'all' | 'true' | 'false'>('all');
  protected readonly users = computed(() => {
    // Filter users' isActive by selected filter value.
    if (this.#usersResource.hasValue()) {
      const filter = this.usersActiveFilter();
      const users = this.#usersResource.value().filter(({ isActive }) => {
        if (filter === 'all') {
          return true;
        }
        else {
          return isActive === (filter === 'true');
        }
      });

      return users;
    }

    return [];
  });

  protected onCardClick(id: string) {
    this.#router.navigate([`/users/${id}`]);
  }
}
