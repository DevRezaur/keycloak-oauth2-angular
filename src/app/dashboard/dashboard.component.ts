import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { RestApiService } from '../service/rest-api.service';
import { SsoService } from '../service/sso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private refresh$ = new BehaviorSubject<boolean>(true);
  public users: User[] = [];

  constructor(
    private restApi: RestApiService,
    private ssoService: SsoService
  ) {}

  ngOnInit(): void {
    this.refresh$.subscribe((_) => this.getAllUser());
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
