import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomersContainer {
}
