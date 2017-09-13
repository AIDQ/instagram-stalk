import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdCardModule,
  MdMenuModule,
  MdDialogModule,
  MdExpansionModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdMenuModule,
    MdDialogModule,
    MdExpansionModule,
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdMenuModule,
    MdDialogModule,
    MdExpansionModule,
  ],
})
export class AngularMaterialModule { }
