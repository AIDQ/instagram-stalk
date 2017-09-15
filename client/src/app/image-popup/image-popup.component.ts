import { Component, Inject, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ImagePopupComponent implements OnInit {
  private multiplier = 0.8;
  public width;
  public height;

  constructor(
    private dialogRef: MdDialogRef<ImagePopupComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) { }

  private updateSize() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    this.width = size * this.multiplier;
    this.height = size * this.multiplier;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSize();
  }

  ngOnInit() {
    this.updateSize();
  }
}
