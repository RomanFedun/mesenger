import { CanActivateFn, Router } from '@angular/router';
import { map, Observable, of } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({providedIn: "root"})

class PermissionsService {

  authService = inject(AuthService)
  router = inject(Router)
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(map(isLoggedIn => {
      if(isLoggedIn) return true
      this.router.navigateByUrl('/')

      return false
    }))
  }

}

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  return inject(PermissionsService).canActivate()
};
