import { Routes } from '@angular/router';

export default [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('@/features/home/home'),
  },
  {
    path: 'users',
    title: 'Users',
    loadChildren: () => import('@/features/users/routes'),
  },
  {
    path: 'customers',
    title: 'Customers',
    loadChildren: () => import('@/features/customers/routes'),
  },
  {
    path: 'settings',
    title: 'Settings',
    loadComponent: () => import('@/features/settings/settings'),
  },
  {
    path: 'products',
    title: 'Products',
    loadChildren: () => import('@/features/products/routes'),
  },
] satisfies Routes;
