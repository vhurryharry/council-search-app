import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private HTTP_HEADERS = new HttpHeaders().set('Content-Type', 'application/json');
    private REST_API_SERVER = environment.baseUrl;

    public redirectUrl = '';

    constructor(private http: HttpClient, private cookieService: CookieService) { }

    @Output() getUserName: EventEmitter<string | null> = new EventEmitter();

    public getCurrentUser(): IUserInfo | null {
        const userCookie = this.cookieService.get('user');
        const user: IUserInfo = userCookie ? JSON.parse(userCookie) : null;
        if (user && user.access_token && user.refresh_token) {
            return user;
        }

        return null;
    }

    public login(email, password): Observable<IUserInfo> {
        return this.http.post<IUserInfo>(this.REST_API_SERVER + '/login', { email, password }, { headers: this.HTTP_HEADERS })
            .pipe(map(user => {
                if (user && user.access_token && user.refresh_token) {
                    this.cookieService.set('user', JSON.stringify(user));

                    this.getUserName.emit(user.username);
                }

                return user;
            }), catchError(err => {
                this.getUserName.emit(null);

                return throwError(err);
            }));
    }

    public logout(): void {
        this.cookieService.delete('user');
        this.getUserName.emit(null);
    }

    public renewToken(): void {

    }
}

export interface IUserInfo {
    username: string;
    roles: Array<string>;
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
}
