import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent],
  imports: [CommonModule, CategoryRoutingModule],
  providers: [CategoryService],
})
export class CategoryModule {}
