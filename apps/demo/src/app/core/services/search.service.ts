import { ApiService } from '@/core/api/api.service.js';
import { wait } from '@/core/reactivity/wait.js';
import { SearchResultItem } from '@/core/types/search-result-item.js';
import { inject, Injectable, linkedSignal, resource, signal } from '@angular/core';
import { SearchResult, SearchResultParams } from '@aui/api';

const SEARCH_DELAY = 200;
const HIGHLIGHT_START_TAG = '<π>';
const HIGHLIGHT_END_TAG = '</π>';

@Injectable({
  providedIn: 'root',
})
export class Search {
  readonly #api = inject(ApiService);
  readonly query = signal('');

  readonly resultsResource = resource({
    params: () => this.query() || undefined,
    loader: async ({ params: query, abortSignal }) => {
      // Debounce by waiting for short delay. Temporary until have better way.
      await wait(SEARCH_DELAY, abortSignal);

      return this.#api.post<SearchResultParams, SearchResult[]>('/search', {
        query,
        highlightPreTag: HIGHLIGHT_START_TAG,
        highlightPostTag: HIGHLIGHT_END_TAG,
      }).then(results => this.#parseResults(results));
    },
  });

  readonly searchResults = linkedSignal<SearchResultItem[] | undefined, SearchResultItem[]>({
    source: this.resultsResource.value,
    computation: (next, prev) => (!next && this.query() ? prev?.value : next) ?? [],
  });

  #parseResults(results: SearchResult[]): SearchResultItem[] | undefined {
    if (!results) {
      return [];
    }

    // const items = result.hits as unknown as SearchResult[];
    return results.map(result => {
      return {
        id: result.id,
        itemId: result.itemId,
        type: result.type,
        url: result.url,
        labelHtml: this.#parseLabelToHtml(result.name || ''),
        subLabelHtml: this.#parseLabelToHtml(result.description || ''),
      };
    });
  }

  /**
   * Returns an HTML string with marked text for the matches
   */
  #parseLabelToHtml(label: string | null): string | null {
    if (label === null) {
      return null;
    }

    const parts: Array<{ highlight: boolean; text: string; }> = [];
    while (label.indexOf(HIGHLIGHT_START_TAG) !== -1) {
      const beforeMatch = label.substring(0, label.indexOf(HIGHLIGHT_START_TAG));
      const match = label.substring(
        label.indexOf(HIGHLIGHT_START_TAG) + 3,
        label.indexOf(HIGHLIGHT_END_TAG),
      );
      parts.push({ highlight: false, text: beforeMatch });
      parts.push({ highlight: true, text: match });
      label = label.substring(label.indexOf(HIGHLIGHT_END_TAG) + 4);
    }
    parts.push({ highlight: false, text: label });

    return parts
      .map(part => {
        return part.highlight ? `<mark>${part.text}</mark>` : `<span>${part.text}</span>`;
      })
      .join('');
  }
}
