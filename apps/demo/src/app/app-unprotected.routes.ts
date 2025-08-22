import { Routes } from '@angular/router';

export default [
  {
    path: 'signin',
    title: 'Login',
    loadComponent: () => import('@/features/auth/signin/signin.component'),
  },
] satisfies Routes;
