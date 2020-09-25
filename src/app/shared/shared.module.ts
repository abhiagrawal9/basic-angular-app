import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { DropDownDirective } from './dropdown.directive';
import { LodingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    DropDownDirective,
    PlaceholderDirective,
    LodingSpinnerComponent,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    DropDownDirective,
    PlaceholderDirective,
    LodingSpinnerComponent,
    CommonModule,
  ],
})
export class SharedModule {}
