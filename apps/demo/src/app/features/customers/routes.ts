import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./containers/customers'),
  },
  {
    path: ':id',
    loadComponent: () => import('./containers/[id]/customer'),
  },
] satisfies Routes;
