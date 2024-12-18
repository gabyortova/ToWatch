import { EditFormComponent } from './edit-form/edit-form.component';
import { DetailsComponent } from './details/details.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { CreateVideoComponent } from './create-video/create-video.component';
import { ToWatchComponent } from './to-watch/to-watch.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthGuard } from './guards/auth.guard';
// import { Component } from '@angulto-watch/to-watch.component';/core';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  {
    path: 'details',
    children: [
      { path: '', component: CatalogComponent },
      {
        path: ':videoId',
        component: DetailsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'edit',
    children: [
      { path: '', component: EditFormComponent },
      {
        path: ':videoId',
        component: EditFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'my-videos', component: ToWatchComponent },
  { path: 'create-video', component: CreateVideoComponent,  canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'details', component: DetailsComponent },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' },
];
