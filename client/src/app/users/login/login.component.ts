import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public model: LoginModel = {
    email: null,
    password: null,
  };

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
  }
}
