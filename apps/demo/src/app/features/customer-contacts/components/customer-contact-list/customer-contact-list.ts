import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomerContactModel } from '@aui/api';

@Component({
  selector: 'app-customer-contact-list',
  imports: [],
  templateUrl: './customer-contact-list.html',
  styleUrl: './customer-contact-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CustomerContactList {
  readonly items = input.required<CustomerContactModel[]>();
}
