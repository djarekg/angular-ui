import { Routes } from '@angular/router';

export default [
  {
    path: '',
    outlet: 'customer-contacts',
    loadComponent: () => import('./containers/customer-contacts'),
  },
  {
    path: ':id',
    loadComponent: () => import('./containers/$id/customer-contact'),
  },
] satisfies Routes;
