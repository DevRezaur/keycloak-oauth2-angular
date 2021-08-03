import { Component, OnInit } from '@angular/core';
import { SsoService } from '../service/sso.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private ssoService: SsoService) {}

  ngOnInit(): void {}

  public login() {
    this.ssoService.login();
  }

  public logout() {
    this.ssoService.logout();
  }

  public isLoggedIn() {
    return this.ssoService.isLoggedIn();
  }
}
