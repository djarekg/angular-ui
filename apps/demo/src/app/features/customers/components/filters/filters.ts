import { FilterPopover } from '@/components/filtering/filter-popover/filter-popover.js';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Control, form } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filters',
  imports: [Control, FilterPopover, MatButtonModule, MatInputModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filters {
  protected readonly form = form(
    signal({
      search: '',
    }),
  );
}
