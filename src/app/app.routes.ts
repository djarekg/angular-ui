import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    // canActivate: [authGuard('protected')],
    data: { animation: 'HomePage' },
    loadComponent: () => import('@/features/home/home.container'),
  },
  {
    path: 'users',
    title: 'Users',
    // canActivate: [authGuard('protected')],
    data: { animation: 'UsersPage' },
    loadComponent: () => import('@/features/users/users.container'),
  },
  {
    path: 'settings',
    title: 'Settings',
    // canActivate: [authGuard('protected')],
    data: { animation: 'SettingsPage' },
    loadComponent: () => import('@/features/settings/settings.container'),
  },
];
