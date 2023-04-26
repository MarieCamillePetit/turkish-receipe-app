import { AfterViewChecked, Component, Inject, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export class GenericPopupData {  
  title: string;
  message: string;
  yesButtonVisible: boolean;
  yesButtonLabel: string;
  noButtonVisible: boolean;
  noButtonLabel: string;
  cancelButtonVisible: boolean;
  cancelButtonLabel: string;
  defaultButton: 'Yes' | 'No' | 'Cancel';
  typeMessage: 'error' | 'warning' | 'success' | 'information' | 'none';
  loadingSpinner: boolean; 

  constructor() {
    this.title = 'Confirmation';
    this.message = 'Êtes vous sûr ?';
    this.loadingSpinner = false;

    this.yesButtonLabel = 'Oui';
    this.noButtonLabel = 'Non';
    this.cancelButtonLabel = 'Annuler';

    this.yesButtonVisible = true;
    this.noButtonVisible = true;
    this.cancelButtonVisible = false;
    this.defaultButton = 'No';
    this.typeMessage = 'none';
  }
}

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.scss']
})
export class GenericPopupComponent implements AfterViewChecked  {

  @ViewChild('yesButton') yesButton: MatButton | undefined;
  @ViewChild('noButton') noButton: MatButton | undefined;
  @ViewChild('cancelButton') cancelButton: MatButton | undefined;

  yesMessage: string = 'Yes';
  noMessage: string = 'No';
  cancelMessage: string = 'Cancel';
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: GenericPopupData) {
    this.data = Object.assign(new GenericPopupData(), data);
  }

  ngAfterViewChecked(): void {
    if (this.data.defaultButton === 'Yes' && this.data.yesButtonVisible) {
      if (this.yesButton) {
        this.yesButton.focus();
      }
    }
    if (this.data.defaultButton === 'No' && this.data.noButtonVisible) {
      if (this.noButton) {
        this.noButton.focus();
      }
    }
    if (this.data.defaultButton === 'Cancel' && this.data.cancelButtonVisible) {
      if (this.cancelButton) {
        this.cancelButton.focus();
      }
    }
  }

  get isError() {
    return this.data.typeMessage === 'error';
  }

  get isWarning() {
    return this.data.typeMessage === 'warning';
  }

  get isSuccess() {
    return this.data.typeMessage === 'success';
  }

  get isInformation() {
    return this.data.typeMessage === 'information';
  }

  get loadingSpinner(){
    return this.data.loadingSpinner;
  }
}
