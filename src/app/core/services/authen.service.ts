import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  logIn(username: string, password: string) {
    const body = 'userName=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password';

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const options = new RequestOptions({ headers: headers });

    return this._http.post(SystemConstants.BASE_API + '/api/oauth/token', body, options)
      .map((response: Response) => {
        const user: LoggedInUser = response.json();
        if (user && user.access_token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        }
      });
  }

  logOut() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);

    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUser(): any {
    let user: LoggedInUser;

    if (this.isUserAuthenticated()) {
      const userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(
        userData.access_token,
        userData.username,
        userData.fullName,
        userData.email,
        userData.avatar,
        userData.roles,
        userData.permissions);
    } else { user = null; }
    return user;
  }

  checkAccess(functionId: string) {
    const user = this.getLoggedInUser();
    const result = false;
    const permission: any[] = JSON.parse(user.permissions);
    const roles: any[] = JSON.parse(user.roles);
    const hasPermission: number = permission.findIndex(x => x.FunctionId === functionId && x.CanRead === true);
    if (hasPermission !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
      return true;
    } else {
      return false
    };
  }

  hasPermission(functionId: string, action: string): boolean {
    const user = this.getLoggedInUser();
    let result = false;
    const permission: any[] = JSON.parse(user.permissions);
    const roles: any[] = JSON.parse(user.roles);
    switch (action) {
      case 'create':
        const canCreate: number = permission.findIndex(x => x.FunctionId === functionId && x.CanCreate === true);
        if (canCreate !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
          result = true;
        }
        break;
      case 'update':
        const canUpdate: number = permission.findIndex(x => x.FunctionId === functionId && x.CanUpdate === true);
        if (canUpdate !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
          result = true;
        }
        break;
      case 'delete':
        const canDelete: number = permission.findIndex(x => x.FunctionId === functionId && x.CanDelete === true);
        if (canDelete !== -1 || roles.findIndex(x => x === 'Admin') !== -1) {
          result = true;
        }
        break;
    }
    return result;
  }
}
