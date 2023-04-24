import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NavigationComponent, NotFoundComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [NavigationComponent],
})
export class CoreModule {}
