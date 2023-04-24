import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceipeComponent } from './receipe.component';

const routes: Routes = [
  {
    path: '',
    component: ReceipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceipeRoutingModule {}
