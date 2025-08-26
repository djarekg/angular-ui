import { ChangeDetectionStrategy, Component, inject, input, viewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { User } from '@aui/api';

@Component({
  selector: 'app-user-list',
  imports: [MatCardModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly #router = inject(Router);
  readonly users = input.required<User[]>();
  readonly cards = viewChildren('.mat-card');

  protected onCardClick(event: MouseEvent, id: string) {
    this.#router.navigate([`/users/${id}`]);
  }
}
