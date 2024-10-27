// src/app/services/jwt-auth.interceptor.ts
import {
  HttpInterceptorFn
} from '@angular/common/http';
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";



export const authInterceptorFunctional: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('/api/')) {
    const router = inject(Router);
    const authToken = localStorage.getItem('jwtToken');

    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Pass the cloned request to the next handler, and catch errors
    return next(authReq).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          // If a 401 or 403 error is encountered, navigate to the login page
          router.navigate(['/auth/login']);
          localStorage.clear();
          location.reload();
        }
        // Re-throw the error so it can be handled elsewhere if needed
        return throwError(error);
      })
    );
  }
  return next(req);
};
