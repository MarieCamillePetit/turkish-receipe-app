import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceipeRoutingModule } from './receipe-routing.module';
import { ReceipeComponent } from './receipe.component';


@NgModule({
  declarations: [
    ReceipeComponent
  ],
  imports: [
    CommonModule,
    ReceipeRoutingModule
  ]
})
export class ReceipeModule { }
