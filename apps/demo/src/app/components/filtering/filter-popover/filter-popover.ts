import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-filter-popover',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, OverlayModule],
  templateUrl: './filter-popover.html',
  styleUrl: './filter-popover.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPopover {
  readonly triggerIcon = input('filter_list');
  readonly tooltip = input('Filter list');

  protected readonly isOpen = signal(false);
}
