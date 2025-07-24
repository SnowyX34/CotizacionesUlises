import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Logins } from './features/auth/pages/login/login'; 
import { SignInComponent } from './features/auth/pages/register/register'; 
import { HomeComponent } from './features/home/pages/home/home'; 
import { AdminProductsComponent } from './features/products/pages/products/products'; 
import { AuthGuard } from './core/utilities/auth.guard';
import { CartComponent } from './features/cart/pages/cart/cart';


const routes: Routes = [
  { path: 'login', component: Logins },
  { path: 'signIn', component: SignInComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Dashboard', component: AdminProductsComponent},
  { path: 'Cart', component: CartComponent},
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '**', redirectTo: 'Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
