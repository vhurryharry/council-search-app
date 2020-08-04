import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  handleError(error: HttpErrorResponse) {
    console.log('Could not request data from server: ' + error?.message);
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = this.loginService.getCurrentUser();
    if (user) {
      const token = user.access_token;
      let newHeaders = req.headers;
      if (token) {
        newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
      }

      req = req.clone({ headers: newHeaders });
    }

    return next.handle(req)
      .pipe(
        catchError(this.handleError)
      );
  }

}
