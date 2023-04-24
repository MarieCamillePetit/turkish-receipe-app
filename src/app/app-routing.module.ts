import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'receipes',
    pathMatch: 'full',
  },
  {
    path: 'receipes',
    loadChildren: () =>
      import('./receipe/receipe.module').then((m) => m.ReceipeModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
