import { CardSkeletonComponent } from '@/components/skeletons/card-skeleton/card-skeleton.component.js';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { User } from '@aui/api';

@Component({
  selector: 'app-user-list',
  imports: [CardSkeletonComponent, MatCardModule, NgOptimizedImage],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly #router = inject(Router);
  readonly users = input.required<User[]>();
  readonly select = output<string>();

  protected onCardClick(_event: MouseEvent, id: string) {
    this.select.emit(id);
  }
}
