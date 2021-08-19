import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUser()) {
      return true;
    } else {
      console.warn('Unauthrized: Auth guard bloked request');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
