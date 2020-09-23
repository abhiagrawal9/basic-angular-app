import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';
import { Router } from '@angular/router';

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
  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

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
      .pipe(
        catchError(this.errorHandler),
        tap((resData: AuthResponseData) => {
          this.userHandler(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
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
      .pipe(
        catchError(this.errorHandler),
        tap((resData: AuthResponseData) => {
          this.userHandler(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');

    this.router.navigate(['/auth']);
  }

  private userHandler(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ): void {
    const tokenExpirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, localId, idToken, tokenExpirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
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
