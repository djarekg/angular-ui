import { UserListComponent } from '@/components/user-list/user-list.component.js';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [UserListComponent],
  templateUrl: './users.container.html',
  styleUrl: './users.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersContainer {
}
