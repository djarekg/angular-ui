import { UserService } from '@/core/auth/user.service.js';
import {
  AUTH_TOKEN_CACHE_KEY,
  AUTH_USER_CACHE_KEY,
  CachedToken,
} from '@/core/identity/index.js';
import { injectIsServer } from '@/core/utils/is-server.js';
import {
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import type { User } from '@aui/api';
import { AuthStatus } from './auth-status.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #isServer = injectIsServer();
  readonly #router = inject(Router);
  readonly #status = signal<AuthStatus>('idle');
  readonly #user = signal<User | null>(null);
  readonly #userService = inject(UserService);

  readonly isAuthenticated = computed(() => this.#status() === 'authenticated');
  readonly isAuthenticating = computed(() => this.#status() === 'idle');
  readonly user = this.#user.asReadonly();
  readonly username = computed(() => this.#user()?.email || '');

  /**
   * Refresh the user authentication status.
   *
   * @returns {Promise<void>} - A promise that resolves when the user is authenticated.
   */
  async refresh() {
    if (this.#isServer) return;

    const tokenRaw = localStorage.getItem(AUTH_TOKEN_CACHE_KEY);
    if (!tokenRaw) {
      this.#user.set(null);
      this.#status.set('unauthenticated');
      return;
    }

    const { username = '' } = JSON.parse(tokenRaw) as CachedToken;
    const user = await this.#userService.getUser(username);

    this.#user.set(user);
    this.#status.set(user ? 'authenticated' : 'unauthenticated');
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
   * Signout the user and redirect to the home page.
   */
  signout() {
    this.#user.set(null);
    this.#status.set('unauthenticated');

    // reset cache
    if (!this.#isServer) {
      localStorage.removeItem(AUTH_TOKEN_CACHE_KEY);
      localStorage.removeItem(AUTH_USER_CACHE_KEY);
    }

    this.#router.navigate(['/']);
  }
}
