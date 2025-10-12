import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { ProductType } from '@aui/api';

export type ProductTypeSelectType = ProductType | ProductType[] | null;

@Component({
  selector: 'app-product-type-select',
  imports: [MatSelectModule, TitleCasePipe],
  templateUrl: './product-type-select.html',
  styleUrl: './product-type-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypeSelect implements FormValueControl<ProductTypeSelectType> {
  readonly value = model<ProductTypeSelectType>(null);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly multiple = input(false, { transform: value => coerceBooleanProperty(value) });

  protected readonly productTypes = Object.keys(ProductType).map(key => {
    return {
      key,
      value: key,
    };
  });

  onChange(value: ProductTypeSelectType) {
    this.value.set(value);
  }
}
