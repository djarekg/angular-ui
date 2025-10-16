import { Form, FormCard } from '@/components/form';
import { GenderSelect } from '@/components/select';
import { FormMode } from '@/core/constants/form-mode.js';
import productSchema from '@/features/products/forms/product.schema.js';
import { type ProductFormModel } from '@/features/products/models';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { apply, Field, form, submit } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { type ProductModel } from '@aui/api';

@Component({
  selector: 'app-product-detail',
  imports: [
    Field,
    Form,
    FormCard,
    GenderSelect,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
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
  readonly mode = input<FormMode>(FormMode.view);
  readonly cancel = output();
  readonly edit = output();
  readonly new = output();
  readonly save = output<ProductFormModel>();

  protected readonly isEditing = computed(() => this.mode() !== FormMode.view);

  protected readonly form = form<ProductFormModel>(this.#product, path => {
    apply(path, productSchema);
  });

  protected onFormChange(mode: FormMode) {
    switch (mode) {
      case FormMode.cancel:
        this.cancel.emit();
        break;
      case FormMode.edit:
        this.edit.emit();
        break;
      case FormMode.new:
        this.new.emit();
        break;
      case FormMode.save:
        this.onSave();
        break;
    }
  }

  protected async onSave() {
    // eslint-disable-next-line @typescript-eslint/require-await
    await submit(this.form, async f => {
      try {
        this.save.emit(f().value());
      } catch (err) {
        console.error('Failed to save product', err);

        return [
          {
            kind: 'product-update-failed',
            message: 'Failed to save product.',
          },
        ];
      }

      return [];
    });
  }
}
