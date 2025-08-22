import { Routes } from '@angular/router';

export default [
  {
    path: '',
    title: 'Home',
    // canActivate: [authGuard],
    loadComponent: () => import('@/features/home/home.container'),
  },
  {
    path: 'users',
    title: 'Users',
    // canActivate: [authGuard],
    loadComponent: () => import('@/features/users/users.container'),
  },
  {
    path: 'settings',
    title: 'Settings',
    // canActivate: [authGuard],
    loadComponent: () => import('@/features/settings/settings.container'),
  },
] satisfies Routes;
