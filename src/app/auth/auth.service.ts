import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_KEY = 'AIzaSyDVivbdRlBta3Uvp0RCSuVuE3tPyG0FemU';
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
      .pipe(
        catchError((errorRes) => {
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
                'Account is blocked due to unusual activity. Please contact support';
              break;
            default:
              errMessage = 'An error occurred!';
              break;
          }
          return throwError(errMessage);
        })
      );
  }
}
