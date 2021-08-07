import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
