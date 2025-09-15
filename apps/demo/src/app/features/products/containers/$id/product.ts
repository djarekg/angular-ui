import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Product {
}
