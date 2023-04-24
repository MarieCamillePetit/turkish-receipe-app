import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

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
  {
    path: '**', // les ** signifient tout le reste des urls
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
