import { Component, OnInit } from '@angular/core';

interface RegisterModel {
  email: string;
  password: string;
  passwordConfirm: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public model: RegisterModel = {
    email: null,
    password: null,
    passwordConfirm: null,
  };

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
  }
}
