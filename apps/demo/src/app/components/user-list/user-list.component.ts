import { CardSkeletonComponent } from '@/components/skeletons/card-skeleton/card-skeleton.component.js';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { User } from '@aui/api';

@Component({
  selector: 'app-user-list',
  imports: [CardSkeletonComponent, MatCardModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly #router = inject(Router);
  readonly users = input.required<User[]>();

  protected onCardClick(event: MouseEvent, id: string) {
    this.#router.navigate([`/users/${id}`]);
  }
}
