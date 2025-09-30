import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ProductModel } from '@aui/api';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, MatCardModule, LowerCasePipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  readonly #router = inject(Router);

  readonly products = input.required<ProductModel[]>();

  protected onProductClick(id: string) {
    this.#router.navigate(['/products', id]);
  }
}
