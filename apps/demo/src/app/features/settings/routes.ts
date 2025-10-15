import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./containers/settings'),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./containers/dashboard-settings/dashboard-settings'),
  },
] satisfies Routes;
