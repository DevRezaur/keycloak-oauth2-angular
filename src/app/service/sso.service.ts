import { Injectable } from '@angular/core';
import {
  AuthConfig,
  NullValidationHandler,
  OAuthService,
} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class SsoService {
  constructor(private oauthService: OAuthService) {}

  public configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/auth-practice',
    redirectUri: window.location.origin + '/dashboard',
    postLogoutRedirectUri: 'http://localhost:4200/',
    clientId: 'angular-frontend',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    requireHttps: false,
    disableAtHashCheck: true,
    showDebugInformation: true,
  };

  public setupAutomaticSilentRefresh() {
    this.oauthService.setupAutomaticSilentRefresh();
  }

  public isLoggedIn() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? true : false;
  }

  public get username() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.preferred_username : '';
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
    this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }
}
