import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserGuard } from './guards/logged-user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./pages/contact/contact.module').then(m => m.ContactModule),
    canActivate: [LoggedUserGuard]
  },
  {
    path: 'login',
    loadChildren: ()=> import('./pages/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   