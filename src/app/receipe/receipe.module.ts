import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceipeRoutingModule } from './receipe-routing.module';
import { ReceipeComponent } from './receipe.component';
import { ReceipeListComponent } from './pages/receipe-list/receipe-list.component';
import { ReceipeService } from './services/receipe.service';
import { SharedModule } from '../shared/shared.module';
import { ReceipeFormComponent } from './components/receipe-form/receipe-form.component';

@NgModule({
  declarations: [ReceipeComponent, ReceipeListComponent, ReceipeFormComponent],
  imports: [CommonModule, ReceipeRoutingModule, SharedModule],
  providers: [ReceipeService],
})
export class ReceipeModule {}
