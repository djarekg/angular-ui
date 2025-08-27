import { UserListComponent } from '@/components/user-list/user-list.component.js';
import { UserService } from '@/core/auth/user.service.js';
import { FormMode } from '@/core/constants/form-mode.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [FormsModule, MatButton, MatButtonToggleModule, UserListComponent],
  templateUrl: './users.container.html',
  styleUrl: './users.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersContainer {
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

  protected onNewUserClick() {
    this.#router.navigate(['/users', 0], {
      queryParams: { mode: FormMode.new },
    });
  }
}
