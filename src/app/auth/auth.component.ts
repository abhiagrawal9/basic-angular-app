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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    if (this.isLoginMode) {
      // login code goes here
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signUp(email, password).subscribe(
        (res) => {
          console.log(res);
        },
        (error: Error) => {
          console.log(error.message);
        }
      );
    }
    form.reset();
  }
}
