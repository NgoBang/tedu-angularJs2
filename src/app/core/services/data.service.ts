import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MessageContstants } from '../common/message.constants';
import { SystemConstants } from '../common/system.constants';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';

@Injectable()
export class DataService {
  private headers: Headers;

  constructor(
    private _http: Http,
    private _router: Router,
    private _authenService: AuthenService,
    private notificationSerice: NotificationService,
    private utilityService: UtilityService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  get(uri: string) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.get(SystemConstants.BASE_API + uri, { headers: this.headers })
      .map(this.extractData);
  }

  post(uri: string, data?: any) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers })
      .map(this.extractData);
  }

  put(uri: string, data?: any) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.put(SystemConstants.BASE_API + uri, data, { headers: this.headers })
      .map(this.extractData);
  }

  delete(uri: string, key: string, id: string) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.delete(SystemConstants.BASE_API + uri + '/?' + key + '=' + id, { headers: this.headers })
      .map(this.extractData);
  }

  postFile(uri: string, data?: any) {
    const newHeader = new Headers();
    newHeader.delete('Authorization');
    newHeader.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.put(SystemConstants.BASE_API + uri, data, { headers: newHeader })
      .map(this.extractData);
  }

  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this.notificationSerice.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this.utilityService.navigateToLogin();
    } else {
      const errMsg = (error.message)
        ? error.message : error.status
          ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
      this.notificationSerice.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }
}
