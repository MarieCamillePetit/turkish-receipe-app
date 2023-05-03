import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Receipe } from '../../models/receipe';
import { ReceipeService } from '../../services/receipe.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { ReceipeFormComponent } from '../../components/receipe-form/receipe-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private router: Router, 
    private auth: AngularFireAuth
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

  delete(id: number) {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/sign-in']);
      }else{
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this receipe ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Yes',
        noButtonLabel: 'No',
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
  });
  }

  openReceipeForm(receipe?: Receipe) {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/sign-in']);
      }else{
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
  }); 
  }

  showReceipeDetails(ReceipeId: number) {
    this.router.navigate(['/receipes/' + ReceipeId]);
  }
}
