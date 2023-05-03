import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Observable, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  categories$: Observable<Category[]>;

  //Ajouter la suite dans receipe-list.componenent.ts
  displayedColumns: string[] = ['id', 'category', 'delete'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.get();
  }

  fetchData() {
    this.categories$ = this.categoryService.get();
  }

  openCategoryForm(category?: Category) {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/sign-in']);
      }else{
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: category ? false : true,
        category: category ? category : undefined,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.fetchData();
        }
      });
    }
  });
  }

  delete(id: number) {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/sign-in']);
      }else{
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cette catégorie ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.categoryService
            .delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success'],
              });
              this.fetchData();
            });
        }
      });
    }
  });
  }

  showCategoryDetails(CategoryId: number) {
    this.router.navigate(['/categories/' + CategoryId]);
  }
}
