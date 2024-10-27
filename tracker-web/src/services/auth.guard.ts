import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const  router  =  inject(Router);
  if (localStorage.getItem('userId') != null &&
        localStorage.getItem('jwtToken') != null) {
    return true;  // Allow access if the user is logged in
  } else {
    router.navigate(['/auth/login']);  // Redirect to the login page if not authenticated
    return false;  // Block access to the route
  }
};
