import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ImagePopupComponent } from '../image-popup/image-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  accounts = Array(10).fill();
  constructor(private dialog: MdDialog) { }

  removeBtn(id: string) {
    console.log(id);
  }

  zoomInBtn(url: string) {
    this.dialog.open(ImagePopupComponent, {
      data: {
        url: url.replace('/s150x150/', '/'),
      },
    });
  }
}
