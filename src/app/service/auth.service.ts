import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();

    // Only required for SSO
    // this.oauthService.events
    //   .pipe(filter((event: any) => event.type === 'session_changed'))
    //   .subscribe((e) => {
    //     this.logout();
    //   });
  }

  private authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/oauth2-test',
    redirectUri: window.location.origin + '/callback',
    postLogoutRedirectUri: 'http://localhost:4200/',
    clientId: 'angular-frontend',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    requireHttps: false,
    disableAtHashCheck: true,
    showDebugInformation: true,

    // Only required for SSO
    //sessionChecksEnabled: true,
  };

  public configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public redirectOnCallback(): void {
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else if (event instanceof OAuthSuccessEvent) {
        if (
          event.type === 'token_received' &&
          window.location.href === 'http://localhost:4200/callback'
        ) {
          if (this.isAdmin()) this.router.navigateByUrl('/admin/dashboard');
          else if (this.isUser()) this.router.navigateByUrl('/user/dashboard');
        }
      } else {
        console.warn(event);
      }
    });
  }

  public getClaims(): string[] {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    const claims = JSON.parse(atob(tokens[1]));
    return claims.realm_access.roles;
  }

  public getOAuthEvent(): Observable<OAuthEvent> {
    return this.oauthService.events;
  }

  public isLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  public isAdmin(): boolean {
    return this.getClaims().includes('realm-admin') ? true : false;
  }

  public isUser(): boolean {
    return this.getClaims().includes('realm-user') ? true : false;
  }

  public get username() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.preferred_username : '';
  }

  public get userId() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.sub : '';
  }

  public get idToken() {
    let token: any = this.oauthService.getIdToken();
    return token ? token : '';
  }

  public get accessToken() {
    let token: any = this.oauthService.getAccessToken();
    return token ? token : '';
  }

  public get refreshToken() {
    let token: any = this.oauthService.getRefreshToken();
    return token ? token : '';
  }

  public login() {
    this.oauthService.initCodeFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }
}
