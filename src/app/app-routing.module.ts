import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserGuard } from './guards/logged-user.guard';
import { ContactModule } from './pages/contact/contact.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=> import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: ()=> import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    loadChildren: ()=> import('./pages/contact/contact.module').then(m => ContactModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   