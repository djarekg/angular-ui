import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.container.html',
  styleUrl: './customers.container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomersContainer {
}
