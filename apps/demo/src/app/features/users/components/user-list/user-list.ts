import { CardSkeleton } from '@/components/skeleton/card-skeleton/card-skeleton.js';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserModel } from '@aui/api';

@Component({
  selector: 'app-user-list',
  imports: [CardSkeleton, MatCardModule, NgOptimizedImage],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  readonly #router = inject(Router);
  readonly users = input.required<UserModel[]>();
  readonly select = output<string>();

  protected onCardClick(_event: MouseEvent, id: string) {
    this.select.emit(id);
  }
}
