import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  // Dependency injections: only available from angular 14
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  toastr = inject(ToastrService);

  constructor() {}

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
    let token = this.authService.authenticate(this.loginForm.value);
    if (token) {
      localStorage.setItem('token', token.name);
      this.toastr.success('Logged in successfully');
    } else {
      this.toastr.error('Failed to login');
    }
  }
}
