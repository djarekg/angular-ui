import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly #http = inject(HttpClient);

  get<T>(url: string) {
    const { promise, resolve, reject } = Promise.withResolvers<T>();

    this.#http.get<T>(url).subscribe({
      next: data => resolve(data),
      error: err => reject(err),
    });

    return promise;
  }
}
