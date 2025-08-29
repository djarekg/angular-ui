import { authGuard } from '@/core/auth/auth.guard.js';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import {
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

// const transitionCreated = new Subject<void>();

export const routerProviders = provideRouter(
  [
    // The default route is protected and uses the protected-layout.
    {
      path: '',
      canActivate: [authGuard],
      loadComponent: () => import('@/features/layout/protected-layout/protected-layout.container'),
      loadChildren: () => import('@/app-protected.routes'),
    },
    {
      path: 'unprotected',
      loadComponent: () =>
        import('@/features/layout/unprotected-layout/unprotected-layout.container'),
      loadChildren: () => import('@/app-unprotected.routes'),
    },
  ],
  withInMemoryScrolling(),
  withRouterConfig({ canceledNavigationResolution: 'computed' }),
  withNavigationErrorHandler(({ error }) => {
    if (error instanceof HttpErrorResponse) {
      // TODO: Redirect to different pages on different response codes? (e.g. 500 page)
      return new RedirectCommand(inject(Router).parseUrl('/404'));
    }
    return void 0;
  }),
  withViewTransitions(),
  // withViewTransitions({
  //   onViewTransitionCreated: ({ transition, to }) => {
  //     transitionCreated.next();
  //     const router = inject(Router);
  //     const toTree = createUrlTreeFromSnapshot(to, []);
  //     // Skip the transition if the only thing changing is the fragment and queryParams
  //     if (
  //       router.isActive(toTree, {
  //         paths: 'exact',
  //         matrixParams: 'exact',
  //         fragment: 'ignored',
  //         queryParams: 'ignored',
  //       })
  //     ) {
  //       transition.skipTransition();
  //     }
  //   },
  // }),
  withComponentInputBinding(),
  withPreloading(PreloadAllModules),
);
