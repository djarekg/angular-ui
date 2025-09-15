import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductModel } from '@aui/api';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  products = input.required<ProductModel[]>();
}
