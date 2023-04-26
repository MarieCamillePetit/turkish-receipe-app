import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Receipe } from '../../models/receipe';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ReceipeService } from '../../services/receipe.service';

export interface ReceipeFormData {
  isCreateForm: boolean;
  receipe: Receipe;
}

@Component({
  selector: 'app-receipe-form',
  templateUrl: './receipe-form.component.html',
  styleUrls: ['./receipe-form.component.scss'],
})
export class ReceipeFormComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  levels: string[] = ['Débutant', 'Intermédiaire', 'Avancé'];

  receipeForm = this.fb.group({
    id: [0, [Validators.required]],
    receipeName: ['', [Validators.required]],
    descriptionReceipe: ['', [Validators.required]],
    time: ['', [Validators.required]],
    level: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<ReceipeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceipeFormData,
    private fb: FormBuilder,
    private receipeService: ReceipeService,
    private _snackBar: MatSnackBar
  ) {
    if (!data.isCreateForm) {
      this.setReceipeForm(data.receipe);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setReceipeForm(receipe: Receipe) {
    this.receipeForm.setValue({
      id: receipe.id,
      receipeName: receipe.receipeName,
      descriptionReceipe: receipe.descriptionReceipe,
      time: receipe.time,
      level: receipe.level,
      category: receipe.category,
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit() {
    if (this.receipeForm.valid) {
      if (this.data.isCreateForm) {
        this.receipeForm.value.id = Date.now() + Math.random();
        this.receipeService
          .create(this.receipeForm.value as Receipe)
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success'],
            });

            this.dialogRef.close(true);
          });
      } else {
        this.receipeService
          .update(this.receipeForm.value as Receipe)
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
