import { ProfileComponent } from './profile/profile.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { DetailsComponent } from './details/details.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { CreateVideoComponent } from './create-video/create-video.component';
import { ToWatchComponent } from './to-watch/to-watch.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'catalog',
    children: [
      { path: '', component: CatalogComponent },
      {
        path: ':videoId',
        component: DetailsComponent,
      },
    ],
  },
  { path: 'edit/:videoId', component: EditFormComponent, canActivate: [AuthGuard] },
  { path: 'my-videos', component: ToWatchComponent, canActivate: [AuthGuard] },
  {
    path: 'create-video',
    component: CreateVideoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorMsgComponent },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' },
];
