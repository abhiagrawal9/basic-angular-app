import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_KEY = 'AIzaSyDVivbdRlBta3Uvp0RCSuVuE3tPyG0FemU';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.AUTH_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.AUTH_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(errorRes: HttpErrorResponse): Observable<any> {
    let errMessage = 'An unknown error occurred.';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'Email is already exists.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errMessage = 'Password signin is disabled for the project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errMessage =
          'Account is blocked due to unusual activity. Please contact support.';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'Email does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'Password is invalid.';
        break;
      case 'USER_DISABLED':
        errMessage = 'The user account has been disabled by an administrator.';
        break;
      default:
        errMessage = 'An error occurred!';
        break;
    }
    return throwError(errMessage);
  }
}
