import { Routes } from '@angular/router';
import { AddMisafirhaneComponent } from './components/add-misafirhane/add-misafirhane.component';
import { MisafirhaneListComponent } from './components/misafirhane-list/misafirhane-list.component';
import { MisafirhaneDetailComponent } from './components/misafirhane-detail/misafirhane-detail.component';

export const misafirhaneRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: MisafirhaneListComponent },
  { path: 'add', component: AddMisafirhaneComponent },
  { path: ':id', component: MisafirhaneDetailComponent }
];
