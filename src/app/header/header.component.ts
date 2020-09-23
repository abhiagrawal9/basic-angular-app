import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenciated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authServcie: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authServcie.user.subscribe((user) => {
      this.isAuthenciated = !user ? false : true;
      // this.isAuthenciated = !!user; one more way to do above step
    });
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.isAuthenciated = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
