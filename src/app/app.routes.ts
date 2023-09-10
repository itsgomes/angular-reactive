import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.page').then((p => p.HomePage)) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then((p => p.LoginPage)) }
];
