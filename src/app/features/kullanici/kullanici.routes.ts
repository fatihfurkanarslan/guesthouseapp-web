// src/app/features/kullanici/kullanici.routes.ts
import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AddUserComponent } from './components/add-user/add-user.component';
// import { UserDetailComponent } from './components/user-detail/user-detail.component';
// import { AddUserComponent } from './components/add-user/add-user.component';

export const kullaniciRoutes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: UserListComponent },
    { path: 'add',  component: AddUserComponent },

//   // /users/:id    → düzenleme / detay
{ path: ':id', component: UserDetailComponent },
];
