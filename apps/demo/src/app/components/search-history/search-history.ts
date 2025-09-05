import { SearchItem } from '@/core/directives/search-item.directive.js';
import { RelativeLink } from '@/core/pipes/relative-link-pipe.js';
import { SearchHistory as SearchHistoryService } from '@/core/services/search-history.service.js';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  Injector,
  viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-history',
  imports: [RouterLink, SearchItem],
  templateUrl: './search-history.html',
  styleUrl: './search-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeydown($event)',
    '(document:mousemove)': 'onMouseMove($event)',
  },
})
export class SearchHistory {
  protected readonly items = viewChildren(SearchItem);

  readonly history = inject(SearchHistoryService);
  readonly #injector = inject(Injector);
  readonly #router = inject(Router);

  readonly #relativeLink = new RelativeLink();
  readonly #keyManager = new ActiveDescendantKeyManager(
    this.items,
    this.#injector,
  ).withWrap();

  #lastMouseCoor: { x: number; y: number; } = { x: 0, y: 0 };

  constructor() {
    inject(DestroyRef).onDestroy(() => this.#keyManager.destroy());

    afterNextRender({
      write: () => {
        if (this.items().length) {
          this.#keyManager.setFirstItemActive();
        }
      },
    });

    const keyManagerActive = toSignal(this.#keyManager.change);

    effect(() => {
      if (keyManagerActive() !== undefined) {
        this.#keyManager.activeItem?.scrollIntoView();
      }
    });
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.navigateToTheActiveItem();
    }
    else {
      this.#keyManager.onKeydown(e);
    }
  }

  onMouseMove(e: MouseEvent) {
    // Happens before mouseenter
    this.#lastMouseCoor = { x: e.clientX, y: e.clientY };
  }

  onMouseEnter(e: MouseEvent, idx: number) {
    // Since `mouseenter` can be called when there isn't a `mousemove`
    // in the case when the key navigation is scrolling items into the view
    // that happen to be under the mouse cursor, we need to perform a mouse
    // coor check to prevent this undesired behavior.
    const { x, y } = this.#lastMouseCoor;
    if (e.clientX === x && e.clientY === y) {
      return;
    }

    this.#keyManager.setActiveItem(idx);
  }

  navigateToTheActiveItem() {
    const activeItemLink = this.#keyManager.activeItem?.item()?.url;

    if (activeItemLink) {
      const url = this.#relativeLink.transform(activeItemLink);
      this.#router.navigateByUrl(url);
    }
  }
}
