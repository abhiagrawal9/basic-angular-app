import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    if (this.isLoginMode) {
      // login code goes here
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signUp(email, password).subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
        },
        (error: Error) => {
          // tslint:disable-next-line: no-string-literal
          const message = error['error'].error.message;
          switch (message) {
            case 'EMAIL_EXISTS':
              this.error = 'Email is already exists.';
              break;
            case 'OPERATION_NOT_ALLOWED':
              this.error = 'Password signin is disabled for the project.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              this.error =
                'Account is blocked due to unusual activity. Please contact support';
              break;
            default:
              this.error = 'An error occurred!';
              break;
          }
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }
}
