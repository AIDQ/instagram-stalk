import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ImagePopupComponent } from '../image-popup/image-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  accounts = Array(10).fill({
    id: '69420',
    username: 'taylorswift',
    url: 'https://instagram.fsof3-1.fna.fbcdn.net/t51.2885-19/s150x150/20969376_112654676087652_1378856425261891584_a.jpg',
    name: 'Taylor Swift',
    posts: 18,
    bio: `The old Taylor can't come to the phone right now. taylor.lk/ReadyForIt`,
  });
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
