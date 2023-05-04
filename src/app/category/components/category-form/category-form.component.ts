import { Component, Inject, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../services/category.service';

export interface CategoryFormData {
  isCreateForm: boolean;
  category: Category;
}

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  categorys: string[] = ['Starter', 'Main course', 'Dessert'];

  categoryForm = this.fb.group({
    id: [0, [Validators.required]],
    category: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryFormData,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {
    if (!data.isCreateForm) {
      this.setCategoryForm(data.category);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setCategoryForm(category: Category) {
    this.categoryForm.setValue({
      id: category.id,
      category: category.category,
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Create Category';
    }
    return 'Edit Category';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Add';
    }
    return 'Edit';
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.data.isCreateForm) {
        this.categoryForm.value.id = Date.now() + Math.random();
        this.categoryService
          .create(this.categoryForm.value as Category)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success'],
            });

            this.dialogRef.close(true);
          });
      } else {
        this.categoryService
          .update(this.categoryForm.value as Category)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success'],
            });

            this.dialogRef.close(true);
          });
      }
    }
  }
}
