import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.checkLoggedIn(state.url)) {
            return true;
        }

        return false;
    }

    checkLoggedIn(url: string): boolean {
        if (this.loginService.getCurrentUser()) {
            return true;
        }

        this.loginService.redirectUrl = url;
        this.router.navigateByUrl('/login');
        return false;
    }

}
