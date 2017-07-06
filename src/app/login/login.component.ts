import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageContstants } from '../core/common/message.constants';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  returnUrl: string;

  constructor(
    private route: Router,
    private authenService: AuthenService,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authenService.logIn(this.model.username, this.model.password).subscribe(data => {
      this.route.navigate([UrlConstants.HOME]);
    }, error => {
      this.notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }
}
