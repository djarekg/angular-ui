import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    // canActivate: [authGuard('protected')],
    data: { animation: 'HomePage' },
    loadComponent: () => import('@/features/home/home.container'),
  },
];
