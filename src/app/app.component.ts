import { Component } from '@angular/core';
import { SsoService } from './service/sso.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private ssoService: SsoService) {
    this.ssoService.configure();
    this.ssoService.setupAutomaticSilentRefresh();
  }
}
