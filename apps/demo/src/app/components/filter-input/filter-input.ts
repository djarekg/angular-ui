import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter-input',
  imports: [MatIconModule, MatInputModule],
  templateUrl: './filter-input.html',
  styleUrl: './filter-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-filter-input',
  },
})
export class FilterInput {
  readonly hasLabel = input(false);
  readonly label = input('');
  readonly hasIcon = input(true);
  readonly icon = input('filter_list');
  readonly placeholder = input('Type to filter');
  readonly valueChange = output<string>();

  protected onKeypress({ type, target: input }: KeyboardEvent) {
    this.valueChange.emit((input as HTMLInputElement).value);
  }
}
