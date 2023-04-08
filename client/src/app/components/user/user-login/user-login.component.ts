import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginFormBuilder();
  }

  // -------------------------------------------------------------------------
  // Form builder
  // --------------------------------------------------------------------------

  loginFormBuilder() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  // -------------------------------------------------------------------------
  // Getter method for all form controls
  // --------------------------------------------------------------------------

  get Email() {
    return this.loginForm.get('email') as FormControl;
  }

  get Password() {
    return this.loginForm.get('password') as FormControl;
  }

  login() {
    console.log(this.loginForm);
  }
}
