import { GenericPopupComponent } from './../../shared/components/generic-popup/generic-popup.component';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { finalize, Observable } from "rxjs";

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog, private zone: NgZone) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let dialog: MatDialogRef<GenericPopupComponent, any>;

        this.zone.run(() =>
            dialog = this.dialog.open(GenericPopupComponent, {
                data: {
                    title: 'Chargement en cours ...',
                    message: '',
                    typeMessage: 'none',
                    yesButtonVisible: false,
                    noButtonVisible: false,
                    cancelButtonVisible: false,
                    defaultButton: 'Yes',
                    yesButtonLabel: 'Fermer',
                    loadingSpinner: true
                },
            })
        );

        return next.handle(request).pipe(
            finalize(() => {
                dialog.close();
            })
        ) as Observable<HttpEvent<any>>;
    }
}