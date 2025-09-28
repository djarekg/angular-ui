import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ProductType } from '@aui/api';

@Component({
  selector: 'app-product-type-select',
  imports: [MatCheckboxModule, MatSelectModule, TitleCasePipe],
  templateUrl: './product-type-select.html',
  styleUrl: './product-type-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypeSelect implements FormValueControl<ProductType[]> {
  readonly value = model<ProductType[]>([]);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  protected readonly productTypes = Object.keys(ProductType).map(key => {
    return {
      key,
      value: key,
    };
  });

  onChange(value: ProductType[]) {
    this.value.set(value);
  }
}
