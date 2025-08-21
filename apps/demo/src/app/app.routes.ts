import { authGuard } from '@/core/auth/auth.guard.js';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    canActivate: [authGuard],
    data: { animation: 'HomePage' },
    loadComponent: () => import('@/features/home/home.container'),
  },
  {
    path: 'users',
    title: 'Users',
    canActivate: [authGuard],
    data: { animation: 'UsersPage' },
    loadComponent: () => import('@/features/users/users.container'),
  },
  {
    path: 'settings',
    title: 'Settings',
    canActivate: [authGuard],
    data: { animation: 'SettingsPage' },
    loadComponent: () => import('@/features/settings/settings.container'),
  },
] as const;
