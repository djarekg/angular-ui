import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.container.html',
  styleUrl: './users.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UsersContainer {

}
