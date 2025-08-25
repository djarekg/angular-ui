import { UserDetailComponent } from '@/components/user-detail/user-detail.component.js';
import { UserService } from '@/core/auth/user.service.js';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [UserDetailComponent, MatProgressSpinnerModule],
  templateUrl: './user.container.html',
  styleUrl: './user.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserContainer {
  readonly #route = inject(ActivatedRoute);
  readonly #userService = inject(UserService);

  protected readonly userResource = resource({
    loader: () => this.#userService.getUser(this.#route.snapshot.paramMap.get('id')!),
  });
}
