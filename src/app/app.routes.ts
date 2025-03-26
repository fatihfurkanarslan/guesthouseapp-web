import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/components/dashboard.routes').then(m => m.dashboardRoutes) 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
