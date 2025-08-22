import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./users.container'),
  },
  {
    path: ':id',
    loadComponent: () => import('./[id]/user.container'),
  },
] satisfies Routes;
