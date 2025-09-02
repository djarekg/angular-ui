import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./users'),
  },
  {
    path: ':id',
    loadComponent: () => import('./[id]/user'),
  },
] satisfies Routes;
