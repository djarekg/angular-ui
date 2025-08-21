import { AuthService } from '@/core/auth/auth.service.js';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  filter,
  map,
} from 'rxjs';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return toObservable(authService.isAuthenticated).pipe(
    filter(() => !authService.isAuthenticating()),
    map(isAuthenticated => {
      if (isAuthenticated) return true;
      return router.navigate(['/signin']);
    }),
  );
};
