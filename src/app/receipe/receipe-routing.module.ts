import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceipeComponent } from './receipe.component';
import { ReceipeDetailsComponent } from './pages/receipe-details/receipe-details.component';

const routes: Routes = [
  {
    path: '',
    component: ReceipeComponent,
  },
  {
    path: ':id',
    component: ReceipeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceipeRoutingModule {}
