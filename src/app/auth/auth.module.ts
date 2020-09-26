import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, RouterModule, FormsModule, AuthRoutingModule],
})
export class AuthModule {}
