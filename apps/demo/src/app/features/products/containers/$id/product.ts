import ProductDetail from '@/features/products/components/product-detail/product-detail.js';
import { ProductService } from '@/features/products/services/product.service.js';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [ProductDetail],
  templateUrl: './product.html',
  styleUrl: './product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Product {
  readonly #service = inject(ProductService);
  readonly #id = signal<string>(inject(ActivatedRoute).snapshot.params['id']);

  protected readonly resource = resource({
    params: () => this.#id(),
    loader: ({ params }) => this.#service.getById(params),
  });
}
