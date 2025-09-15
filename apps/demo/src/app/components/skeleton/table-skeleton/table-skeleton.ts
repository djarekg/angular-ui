import { randomNum } from '@/core/utils/random.js';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  imports: [],
  templateUrl: './table-skeleton.html',
  styleUrl: './table-skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeleton {
  readonly rows = input<number, string>(5, { transform: numberAttribute });
  readonly columns = input<number, string>(5, { transform: numberAttribute });

  protected readonly rowsCollection = computed(() => Array<number>(this.rows()).fill(0));
  protected readonly columnsCollection = computed(() => Array<number>(this.columns()).fill(0));
  protected readonly randomNum = randomNum; // Make randomNum function accessible to the template.
}
