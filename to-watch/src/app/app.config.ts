import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appInterceptor } from './app.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([appInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
