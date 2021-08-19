import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public user: User | null = null;

  constructor(
    private restApi: RestApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.restApi.getUserData(this.userId).subscribe(
      (response) => (this.user = response),
      (error) => console.warn('Failed to Get User Info')
    );
  }

  public get username() {
    return this.authService.username;
  }

  public get userId() {
    return this.authService.userId;
  }

  public logout() {
    this.authService.logout();
  }
}
