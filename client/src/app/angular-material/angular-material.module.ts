import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdCardModule,
  MdMenuModule,
  MdDialogModule,
  MdInputModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
  ],
})
export class AngularMaterialModule { }
