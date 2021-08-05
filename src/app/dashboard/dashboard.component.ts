import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { RestApiService } from '../service/rest-api.service';
import { SsoService } from '../service/auth.service';

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
    this.getAllUser();
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
        alert('Failed To Get All User');
      }
    );
  }

  public logout() {
    this.ssoService.logout();
  }
}
