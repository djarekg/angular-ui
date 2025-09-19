import { ProductList } from '@/features/products/components/product-list/product-list.js';
import { ProductTypeSelect } from '@/features/products/components/product-type-select/product-type-select.js';
import { ProductService } from '@/features/products/services/product.service.js';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { ProductType } from '@aui/api';

@Component({
  selector: 'app-products',
  imports: [ProductList, ProductTypeSelect],
  templateUrl: './products.html',
  styleUrl: './products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly #service = inject(ProductService);
  readonly #productTypes = signal<ProductType[]>([]);

  protected readonly resource = resource({
    params: () => this.#productTypes(),
    loader: ({ params }) => this.#service.get(params),
  });

  protected onProductTypeChange(productTypes: ProductType[]) {
    this.#productTypes.set(productTypes);
  }
}
