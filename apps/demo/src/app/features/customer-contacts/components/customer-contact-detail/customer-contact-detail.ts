import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customer-contact-detail',
  imports: [],
  templateUrl: './customer-contact-detail.html',
  styleUrl: './customer-contact-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'has-active',
  },
})
export default class CustomerContactDetail {
}
