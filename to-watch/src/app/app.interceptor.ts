/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from './../environments/environment.development';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMsgService } from './core/error-msg/error-msg.service';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(req);

  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    });
  }
  console.log(`req URL ${req.url}, withCredentials: ${req.withCredentials}`);
  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      errorMsgService.setError(err.error);
      setTimeout(() => {
        errorMsgService.setError(null);
      }, 5000);
      if (err.status === 401) {
        router.navigate(['/login']);
      } else {
        router.navigate(['/error']);
      }

      return [err];
    })
  );
};
