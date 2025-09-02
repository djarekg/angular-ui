import { Routes } from '@angular/router';

export default [
  {
    path: 'signin',
    title: 'Welcome to Angular UI',
    loadComponent: () => import('@/features/auth/signin/signin'),
  },
] satisfies Routes;
