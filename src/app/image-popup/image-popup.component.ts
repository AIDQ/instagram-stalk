import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-popup',
  template: '<img src="{{data.url}}">',
  styleUrls: ['./image-popup.component.css'],
})
export class ImagePopupComponent {
  constructor(
    private dialogRef: MdDialogRef<ImagePopupComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) { }
}
