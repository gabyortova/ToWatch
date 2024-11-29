import { RegisterComponent } from './register/register.component';
import { CatalogComponent } from './catalog/catalog.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'register', component: RegisterComponent },
];
