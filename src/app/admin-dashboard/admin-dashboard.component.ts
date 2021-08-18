import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { RestApiService } from '../service/rest-api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private restApi: RestApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  public get username() {
    return this.authService.username;
  }

  public get userId() {
    return this.authService.userId;
  }

  public getAllUser() {
    this.restApi.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error) => {
        alert('Failed To Get All User');
      }
    );
  }

  public logout() {
    this.authService.logout();
  }
}
