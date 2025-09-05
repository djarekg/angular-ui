import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomerContainer {
}
