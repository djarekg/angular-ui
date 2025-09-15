import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./containers/products'),
  },
  {
    path: ':id',
    loadComponent: () => import('./containers/$id/product'),
  },
] satisfies Routes;
