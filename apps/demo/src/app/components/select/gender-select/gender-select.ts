import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';
import { MatSelectModule } from '@angular/material/select';
import { Gender } from '@aui/api';

@Component({
  selector: 'app-gender-select',
  imports: [MatSelectModule, TitleCasePipe],
  templateUrl: './gender-select.html',
  styleUrl: './gender-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderSelect implements FormValueControl<Gender | undefined> {
  readonly value = model<Gender | undefined>(undefined);
  readonly disabled = input(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  protected readonly genders = Object.keys(Gender).map(key => {
    return {
      key,
      value: key,
    };
  });

  onChange(value: Gender) {
    this.value.set(value);
  }
}
