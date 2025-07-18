import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from '../app/app'; 
import { Logins } from './auth/pages/login/login';
import { SignInComponent } from './auth/pages/register/register';
import { HomeComponent } from './auth/pages/home/home';
import { RouterModule } from '@angular/router';
import { AdminProductsComponent } from './auth/pages/products/products';

import { AddTokenInterceptor } from '../app/core/utilities/add-token.interceptor';
import { Navbar } from "./auth/pages/navbar/navbar";
@NgModule({
  declarations: [
    AppComponent,
    Logins,
    SignInComponent,
    HomeComponent,
    Navbar,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
        preventDuplicates: true
    }),
    CommonModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
})
export class AppModule {}
