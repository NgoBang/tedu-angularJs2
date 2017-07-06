import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
            return true;
        } else {
            this.router.navigate([UrlConstants.LOGIN],
                {
                    queryParams: { returnUrl: state.url }
                });
            return false;
        }
    }
}
