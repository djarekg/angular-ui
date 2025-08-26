import { AUTH_TOKEN_CACHE_KEY, CachedToken } from '@/core/identity/index.js';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AuthStatus } from './auth-status.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #http = inject(HttpClient);
  readonly #cookieService = inject(SsrCookieService);
  readonly #router = inject(Router);
  readonly #status = signal<AuthStatus>('idle');

  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');
  readonly isAuthenticating = computed(() => this.#status() === 'idle');

  get #tokenCache() {
    const tokenRaw = this.#cookieService.get(AUTH_TOKEN_CACHE_KEY);
    return JSON.parse(tokenRaw) as CachedToken;
  }

  get userId() {
    return this.#tokenCache.userId;
  }

  get username() {
    return this.#tokenCache.username;
  }

  /**
   * Refresh the user authentication status.
   */
  async refresh() {
    const tokenRaw = this.#cookieService.get(AUTH_TOKEN_CACHE_KEY);

    if (tokenRaw) {
      this.#status.set('authenticated');
    }
    else {
      this.#status.set('unauthenticated');
    }
  }

  /**
   * Authenticate the user and redirect to the specified url.
   *
   * @param {string[]} urlSegments - The url segments to navigate to after authentication.
   */
  authenticate(urlSegments: string[] = ['/']) {
    this.refresh().then(() => this.#router.navigate(urlSegments));
  }

  /**
   * Verify user credentials and store auth token.
   */
  signin(username: string, password: string) {
    const { promise, resolve, reject } = Promise.withResolvers<boolean>();

    this.#status.set('idle');

    this.#http.post<{ token: string; userId: string; }>('/auth/signin', {
      username,
      password,
    }).subscribe({
      next: ({ token, userId }) => {
        if (token) {
          this.#cookieService.set(
            AUTH_TOKEN_CACHE_KEY,
            JSON.stringify({ token, userId, username }),
          );
          this.#status.set('authenticated');
          this.authenticate();
          resolve(true);
        }
        else {
          this.#status.set('unauthenticated');
          resolve(false);
        }
      },
      error: err => {
        console.error('Failed to signin', err);
        reject(false);
      },
    });

    return promise;
  }

  /**
   * Signout the user and redirect to the home page.
   */
  signout() {
    this.#cookieService.deleteAll();
    this.#status.set('unauthenticated');
    this.#router.navigate(['/']);
  }
}
