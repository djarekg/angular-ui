import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductModel } from '@aui/api';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, MatCardModule, LowerCasePipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  readonly products = input.required<ProductModel[]>();
  readonly productClick = output<string>();

  protected onProductClick(id: string) {
    this.productClick.emit(id);
  }
}
