import { apiInterceptor } from '@/core/api/api.interceptor.js';
import { provideDefaultOptions } from '@/core/options/defaults/index.js';
import {
  HttpErrorResponse,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  createUrlTreeFromSnapshot,
  PreloadAllModules,
  provideRouter,
  RedirectCommand,
  Router,
  withComponentInputBinding,
  withInMemoryScrolling,
  withNavigationErrorHandler,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor.js';

const transitionCreated = new Subject<void>();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiInterceptor, authInterceptor]),
    ),
    provideRouter(
      routes,
      withInMemoryScrolling(),
      withRouterConfig({ canceledNavigationResolution: 'computed' }),
      withNavigationErrorHandler(({ error }) => {
        if (error instanceof HttpErrorResponse) {
          // TODO: Redirect to different pages on different response codes? (e.g. 500 page)
          return new RedirectCommand(inject(Router).parseUrl('/404'));
        }
        return void 0;
      }),
      withViewTransitions({
        onViewTransitionCreated: ({ transition, to }) => {
          transitionCreated.next();
          const router = inject(Router);
          const toTree = createUrlTreeFromSnapshot(to, []);
          // Skip the transition if the only thing changing is the fragment and queryParams
          if (
            router.isActive(toTree, {
              paths: 'exact',
              matrixParams: 'exact',
              fragment: 'ignored',
              queryParams: 'ignored',
            })
          ) {
            transition.skipTransition();
          }
        },
      }),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideDefaultOptions(),
  ],
};
