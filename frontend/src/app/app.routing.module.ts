import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Logins } from '../app/auth/pages/login/login';
import { SignInComponent } from '../app/auth/pages/register/register';
import { HomeComponent } from '../app/auth/pages/home/home';
import { AdminProductsComponent } from './auth/pages/products/products';
import { AuthGuard } from './core/utilities/auth.guard';


const routes: Routes = [
  { path: 'login', component: Logins },
  { path: 'signIn', component: SignInComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Dashboard', component: AdminProductsComponent},
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '**', redirectTo: 'Home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
