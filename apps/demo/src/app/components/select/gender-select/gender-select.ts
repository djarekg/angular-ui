import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
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
export default class GenderSelect implements FormValueControl<Gender | undefined> {
  readonly value = model<Gender | undefined>(undefined);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly change = output<Gender>();

  protected readonly genders = Object.keys(Gender).map(key => {
    return {
      key,
      value: key,
    };
  });

  onChange(value: Gender) {
    this.value.set(value);
    this.change.emit(value);
  }
}
