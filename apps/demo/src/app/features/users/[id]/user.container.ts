import { UserDetailComponent } from '@/components/user-detail/user-detail.component.js';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [UserDetailComponent],
  templateUrl: './user.container.html',
  styleUrl: './user.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserContainer {
  protected readonly userId = signal<string | null>(null);

  constructor(route: ActivatedRoute) {
    route.paramMap.subscribe(params => this.userId.set(params.get('id')));
  }
}
