import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SsoService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private ssoService: SsoService, private router: Router) {}

  canActivate(): boolean {
    if (this.ssoService.isLoggedIn()) {
      return true;
    } else {
      console.warn('Auth guard bloked request. Please sign in');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
