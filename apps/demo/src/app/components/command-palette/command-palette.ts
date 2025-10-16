import { SearchHistory as SearchHistoryComponent } from '@/components/search-history/search-history.js';
import { TextField } from '@/components/text-field/text-field.js';
import { searchResultTypeIconMap } from '@/core/constants/search-result-type-icon-map.js';
import { ClickOutside } from '@/core/directives/click-outside.directive.js';
import { SearchItem } from '@/core/directives/search-item.directive.js';
import { SearchHistory } from '@/core/services/search-history.service.js';
import { Search } from '@/core/services/search.service.js';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  output,
  viewChild,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-command-palette',
  imports: [
    ClickOutside,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    SearchHistoryComponent,
    SearchItem,
    TextField,
  ],
  templateUrl: './command-palette.html',
  styleUrl: './command-palette.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPalette {
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly close = output();

  protected readonly iconMap = searchResultTypeIconMap;
  protected readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('searchDialog');
  protected readonly items = viewChildren(SearchItem);
  protected readonly textField = viewChild(TextField);
  protected readonly history = inject(SearchHistory);

  readonly #search = inject(Search);
  readonly #searchQuery = this.#search.query;
  readonly #injector = inject(Injector);
  readonly #keyManager = new ActiveDescendantKeyManager(this.items, this.#injector).withWrap();

  protected readonly resultsResource = this.#search.resultsResource;
  protected readonly searchResults = this.#search.searchResults;

  // We use a FormControl instead of relying on NgModel+signal to avoid
  // the issue https://github.com/angular/angular/issues/13568
  // TODO: Use signal forms when available
  searchControl = new FormControl(this.#searchQuery(), { nonNullable: true });

  get #dialog() {
    return this.dialog().nativeElement;
  }

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.#keyManager.destroy();
    });

    this.searchControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.#searchQuery.set(value);
    });

    // Thinking about refactoring this to a single afterRenderEffect ?
    // Answer: It won't have the same behavior
    effect(() => {
      this.items();
      afterNextRender(
        {
          write: () => {
            this.#keyManager.setFirstItemActive();
          },
        },
        { injector: this.#injector }
      );
    });

    this.#keyManager.change.pipe(takeUntilDestroyed()).subscribe(() => {
      this.#keyManager.activeItem?.scrollIntoView();
    });

    afterNextRender({
      write: () => {
        if (!this.#dialog.open) {
          this.#dialog.showModal();
        }

        // We want to select the pre-existing text on opening
        // In order to change the search input with minimal user interaction.
        this.textField()?.input().nativeElement.select();
      },
    });
  }

  closeSearchDialog() {
    this.#dialog.close();
    this.close.emit();
  }
}
