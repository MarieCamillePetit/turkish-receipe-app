import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryService } from './services/category.service';
import { CategoryDetailsComponent } from './pages/category-details/category-details.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryFormComponent } from './components/category-form/category-form.component';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    CategoryFormComponent,
  ],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
  providers: [CategoryService],
})
export class CategoryModule {}
