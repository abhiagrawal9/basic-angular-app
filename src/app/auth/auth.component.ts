import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    let authObservable: Observable<AuthResponseData>;
    const email: string = form.value.email;
    const password: string = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(
      (res) => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      (errMessage: string) => {
        this.isLoading = false;
        this.error = errMessage;
        this.showErrorAlert(errMessage);
      }
    );
    form.reset();
  }

  onHandleAlert(): void {
    this.error = null;
  }

  private showErrorAlert(errMessage: string): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
  }
}
