import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Receipe } from '../../models/receipe';
import { ReceipeService } from '../../services/receipe.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { ReceipeFormComponent } from '../../components/receipe-form/receipe-form.component';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.scss'],
})
export class ReceipeListComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  receipes$: Observable<Receipe[]>;

  //Ajouter la suite dans receipe-list.componenent.ts
  displayedColumns: string[] = [
    'receipeName',
    'descriptionReceipe',
    'time',
    'level',
    'category',
    'update',
    'delete',
  ];

  constructor(
    private receipeService: ReceipeService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.receipes$ = this.receipeService.get();
  }

  fetchData() {
    this.receipes$ = this.receipeService.get();
  }

  openStudentForm(receipe?: Receipe) {
    console.log('afficher la pop up de mise à jour', receipe);
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cet étudiant ?',
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
          this.receipeService
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

  openReceipeForm(receipe?: Receipe) {
    const dialogRef = this.dialog.open(ReceipeFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: receipe ? false : true,
        receipe: receipe ? receipe : undefined,
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

  showReceipeDetails(ReceipeId: number) {
    this.router.navigate(['/receipes/' + ReceipeId]);
  }
}
