import { Injectable, resource, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Search {
  query = signal('');

  resultsResource = resource({
    params: () => this.query || undefined,
    loader: ({ params: query, abortSignal }) => {
      return Promise.resolve();
    },
  });
}
