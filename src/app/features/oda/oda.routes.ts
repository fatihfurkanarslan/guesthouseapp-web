import { Routes } from '@angular/router';
import { AddOdaComponent } from './components/add-oda/add-oda.component';
import { OdaListComponent } from './components/oda-list/oda-list.component';
import { OdaDetailComponent } from './components/oda-detail/oda-detail.component';

export const odaRoutes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
  {
    path: 'add',
    component: AddOdaComponent
  },
  {
    path: 'list',
    component: OdaListComponent
  },
  { path: ':id',
      component: OdaDetailComponent }
  // Oda ile ilgili diğer işlemler için ek rotalar ekleyebilirsiniz.
];
