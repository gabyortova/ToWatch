import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CreateVideoComponent } from './create-video/create-video.component';
import { ToWatchComponent } from './to-watch/to-watch.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CatalogComponent } from './catalog/catalog.component';
// import { Component } from '@angulto-watch/to-watch.component';/core';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'to-watch', component: ToWatchComponent },
  { path: 'create-video', component: CreateVideoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' },
];
