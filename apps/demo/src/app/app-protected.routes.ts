import { Routes } from '@angular/router';

export default [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'home',
  // },
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('@/features/home/home.container'),
  },
  {
    path: 'users',
    title: 'Users',
    loadChildren: () => import('@/features/users/routes'),
  },
  {
    path: 'customers',
    title: 'Customers',
    loadComponent: () => import('@/features/customers/customers.container'),
  },
  {
    path: 'settings',
    title: 'Settings',
    loadComponent: () => import('@/features/settings/settings.container'),
  },
] satisfies Routes;
