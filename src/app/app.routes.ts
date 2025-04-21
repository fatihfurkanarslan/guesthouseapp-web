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
  { 
    path: 'reservations',
    loadChildren: () => import('./features/reservations/reservation.routes').then(m => m.reservationRoutes)
  },
  { 
    path: 'misafirhane', 
    loadChildren: () => import('./features/misafirhane/misafirhane.routes').then(m => m.misafirhaneRoutes) 
  },
  { 
    path: 'oda', 
    loadChildren: () => import('./features/oda/oda.routes').then(m => m.odaRoutes) 
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/kullanici/kullanici.routes').then(m => m.kullaniciRoutes)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
