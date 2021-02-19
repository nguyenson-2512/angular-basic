import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authGuardService: AuthGuardService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (!this.authGuardService.getToken()) {
      this.router.navigateByUrl('/login');
    }
    return this.authGuardService.getToken();
  }
}
