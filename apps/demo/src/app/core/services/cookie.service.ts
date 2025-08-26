import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  #platformId = inject(PLATFORM_ID);
  #request = inject(REQUEST, { optional: true });

  exist(key: string) {
    return this.get(key) !== null;
  }

  get(key: string) {
    const regExp = new RegExp(`(^| )${key}=([^;]+)`);
    const cookie = this.#platformCookie.match(regExp);

    return cookie ? decodeURIComponent(cookie[1]) : null;
  }

  // set(key:string, value: string) {
  //   this.#platformCookie

  // }

  get #platformCookie() {
    if (isPlatformBrowser(this.#platformId)) {
      return document.cookie;
    }

    return this.#request?.headers?.get('cookie') ?? '';
  }
}
