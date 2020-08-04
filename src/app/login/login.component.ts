import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from "@angular/router";
import { LoginService } from '../services/login.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string;
    password: string;
    isPageLoading = false;
    isFailed = false;

    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit() { }

    login() {
        this.isPageLoading = true;
        this.isFailed = false;

        this.loginService.login(this.email, this.password)
            .pipe(catchError(err => of(null)))
            .subscribe(user => {
                this.isPageLoading = false;
                if (user) {
                    this.router.navigateByUrl(this.loginService.redirectUrl);
                } else {
                    this.isFailed = true;
                }
            });
    }
}
