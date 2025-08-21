import { authGuard } from '@/core/auth/auth.guard.js';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    canActivate: [authGuard],
    loadComponent: () => import('@/features/home/home.container'),
  },
  {
    path: 'signin',
    title: 'Login',
    // canActivate: [authGuard],
    loadComponent: () => import('@/features/auth/signin/signin.component'),
  },
  {
    path: 'users',
    title: 'Users',
    canActivate: [authGuard],
    loadComponent: () => import('@/features/users/users.container'),
  },
  {
    path: 'settings',
    title: 'Settings',
    canActivate: [authGuard],
    loadComponent: () => import('@/features/settings/settings.container'),
  },
] as const;
