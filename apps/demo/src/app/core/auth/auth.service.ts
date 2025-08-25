import { ApiService } from '@/core/api/api.service.js';
import { UserService } from '@/core/auth/user.service.js';
import { AUTH_TOKEN_CACHE_KEY, AUTH_USER_CACHE_KEY, CachedToken } from '@/core/identity/index.js';
import { injectIsServer } from '@/core/utils/is-server.js';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import type { User } from '@aui/api';
import { AuthStatus } from './auth-status.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #api = inject(ApiService);
  readonly #http = inject(HttpClient);
  readonly #isServer = injectIsServer();
  readonly #router = inject(Router);
  readonly #status = signal<AuthStatus>('idle');
  readonly #user = signal<User | undefined | null>(undefined);
  readonly #userService = inject(UserService);

  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');
  readonly isAuthenticating = computed(() => this.#status() === 'idle');
  readonly user = this.#user.asReadonly();
  readonly username = computed(() => this.#user()?.email || '');

  getUser = (username: string) => this.#api.get<User>(`/auth/users/${username}`);

  /**
   * Refresh the user authentication status.
   *
   * @returns {Promise<void>} - A promise that resolves when the user is authenticated.
   */
  async refresh() {
    if (this.#isServer) return;

    const tokenRaw = sessionStorage.getItem(AUTH_TOKEN_CACHE_KEY);
    if (!tokenRaw) {
      this.#user.set(null);
      this.#status.set('unauthenticated');
      return;
    }

    const { username = '' } = JSON.parse(tokenRaw) as CachedToken;
    const user = await this.getUser(username);

    this.#user.set(user);
    this.#status.set(!!user ? 'authenticated' : 'unauthenticated');
  }

  /**
   * Authenticate the user and redirect to the specified url.
   *
   * @param {string[]} urlSegments - The url segments to navigate to after authentication.
   */
  authenticate(urlSegments: string[] = ['/']) {
    this.refresh().then(() => this.#router.navigate(urlSegments));
  }

  signin(username: string, password: string) {
    const { promise, resolve, reject } = Promise.withResolvers<boolean>();

    this.#status.set('idle');

    this.#http.post<{ token: string; userId: string; }>('/auth/signin', {
      username,
      password,
    }).subscribe({
      next: ({ token, userId }) => {
        if (token) {
          sessionStorage.setItem(AUTH_TOKEN_CACHE_KEY, JSON.stringify({ token, userId, username }));
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
        resolve(false);
      },
    });

    return promise;
  }

  /**
   * Signout the user and redirect to the home page.
   */
  signout() {
    this.#user.set(null);
    this.#status.set('unauthenticated');

    // reset cache
    if (!this.#isServer) {
      sessionStorage.removeItem(AUTH_TOKEN_CACHE_KEY);
      sessionStorage.removeItem(AUTH_USER_CACHE_KEY);
    }

    this.#router.navigate(['/']);
  }
}
