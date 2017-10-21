import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ImagePopupComponent } from './image-popup/image-popup.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { FormsModule } from '@angular/forms';
import { ValidateEqualDirective } from './common/validate-equal.directive';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    HeaderComponent,
    ImagePopupComponent,

    LoginComponent,
    RegisterComponent,
    ValidateEqualDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
  ],
  entryComponents: [ImagePopupComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
