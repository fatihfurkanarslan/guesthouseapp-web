// src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { DashboardMainComponent } from './../components/dashboard-main/dashboard-main.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardMainComponent
  }
];
