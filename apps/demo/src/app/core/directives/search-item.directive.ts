import type { SearchResultItem } from '@/core/types/search-result-item.js';
import { Highlightable } from '@angular/cdk/a11y';
import { Directive, ElementRef, inject, Input, input, signal } from '@angular/core';

@Directive({
  selector: '[appSearchItem]',
  host: {
    '[class.active]': 'isActive',
  },
})
export class SearchItem implements Highlightable {
  // Those inputs are required by the Highlightable interface
  // We can't migrate them to signals yet
  @Input()
  disabled = false;

  readonly item = input<SearchResultItem | undefined>();

  readonly #elementRef = inject(ElementRef<HTMLLIElement>);

  readonly #isActive = signal(false);

  protected get isActive() {
    return this.#isActive();
  }

  setActiveStyles(): void {
    this.#isActive.set(true);
  }

  setInactiveStyles(): void {
    this.#isActive.set(false);
  }

  scrollIntoView(): void {
    this.#elementRef?.nativeElement.scrollIntoView({ block: 'nearest' });
  }
}
