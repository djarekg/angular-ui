import { Routes } from '@angular/router';

export default [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('@/features/home/home.container'),
  },
  {
    path: 'users',
    title: 'Users',
    loadChildren: () => import('@/features/users/routes'),
  },
  {
    path: 'settings',
    title: 'Settings',
    loadComponent: () => import('@/features/settings/settings.container'),
  },
] satisfies Routes;
