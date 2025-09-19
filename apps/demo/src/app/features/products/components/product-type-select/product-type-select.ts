import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, output, viewChildren } from '@angular/core';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { ProductType } from '@aui/api';

@Component({
  selector: 'app-product-type-select',
  imports: [MatCheckboxModule, TitleCasePipe],
  templateUrl: './product-type-select.html',
  styleUrl: './product-type-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypeSelect {
  readonly valueChange = output<ProductType[]>();

  protected readonly productTypes = Object.keys(ProductType).map(key => {
    return {
      key,
      value: key,
    };
  });

  protected readonly checkboxes = viewChildren(MatCheckbox);

  protected onCheckboxChange() {
    const values = this.checkboxes().filter(cb => cb.checked).map(cb => cb.value as ProductType);
    this.valueChange.emit(values);
  }
}
