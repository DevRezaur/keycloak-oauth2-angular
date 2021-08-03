import { Component, OnInit } from '@angular/core';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { User } from '../model/user';
import { RestApiService } from '../service/rest-api.service';
import { SsoService } from '../service/sso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private restApi: RestApiService,
    private ssoService: SsoService
  ) {}

  ngOnInit(): void {
    this.ssoService.getOAuthEvent().subscribe(({ type }: OAuthEvent) => {
      switch (type) {
        case 'token_received':
          this.getAllUser();
          break;
      }
    });

    if (this.ssoService.accessToken) this.getAllUser();
  }

  public get username() {
    return this.ssoService.username;
  }

  public getAllUser() {
    this.restApi.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public logout() {
    this.ssoService.logout();
  }
}
