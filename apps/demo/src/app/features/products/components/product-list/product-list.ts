import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductModel } from '@aui/api';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, MatCardModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  products = input.required<ProductModel[]>();
}
