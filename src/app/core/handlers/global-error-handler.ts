import { GenericPopupComponent } from './../../shared/components/generic-popup/generic-popup.component';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private dialog: MatDialog, private zone: NgZone) {}

  handleError(error: any) {
    console.error(error);

    error = !(error instanceof HttpErrorResponse)
      ? error.rejection
      : this.getMessage(error);

    this.zone.run(() =>
      this.dialog.open(GenericPopupComponent, {
        data: {
          title: 'Une erreur est survenue',
          message: error,
          typeMessage: 'error',
          yesButtonVisible: true,
          noButtonVisible: false,
          cancelButtonVisible: false,
          defaultButton: 'Yes',
          yesButtonLabel: 'Fermer',
        },
      })
    );
  }

  getMessage(response: HttpErrorResponse): string {
    if (response.status === 0) {
      return "L'appel back << " + response.url + ' >> a échoué.';
    }
    return (
      response.status + ' ' + response.statusText + ': ' + response.message
    );
  }
}
