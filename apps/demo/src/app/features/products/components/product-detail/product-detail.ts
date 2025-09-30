import GenderSelect from '@/components/select/gender-select/gender-select.js';
import productSchema from '@/features/products/forms/product.schema.js';
import { ProductFormModel } from '@/features/products/models';
import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';
import { apply, Control, form } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { ProductModel } from '@aui/api';

@Component({
  selector: 'app-product-detail',
  imports: [Control, GenderSelect, MatInputModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'has-active',
  },
})
export default class ProductDetail {
  readonly #product = linkedSignal(() => {
    const { genderId, isActive, name, price, productType } = this.product();
    return { genderId, isActive, name, price, productType } as ProductFormModel;
  });

  readonly product = input.required<ProductModel>();

  protected readonly form = form<ProductFormModel>(this.#product, path => {
    apply(path, productSchema);
  });
}
