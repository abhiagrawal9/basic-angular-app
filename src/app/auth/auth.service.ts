import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.AUTH_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
