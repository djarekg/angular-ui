import { ProductList } from '@/features/products/components/product-list/product-list.js';
import { ProductService } from '@/features/products/services/product.service.js';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [ProductList],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly #service = inject(ProductService);

  protected readonly resource = resource({
    loader: () => this.#service.get(),
  });
}
