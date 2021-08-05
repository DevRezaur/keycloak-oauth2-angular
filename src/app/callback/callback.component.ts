import { Component, OnInit } from '@angular/core';
import { SsoService } from '../service/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
  constructor(private ssoService: SsoService) {}

  ngOnInit(): void {
    this.ssoService.redirectOnCallback();
  }
}
