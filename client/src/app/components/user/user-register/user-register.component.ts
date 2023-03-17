import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        phoneNumber: new FormControl(null, [
          Validators.required,
          Validators.maxLength(11),
        ]),
      },
      // Custom validation
      { validators: [this.confirmPasswordValidationFn] }
    );
  }

  // Custom validation function
  confirmPasswordValidationFn(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { notmatched: true };
  }

  // -------------------------------------------------------------------------
  // Getter method for all form controls
  // --------------------------------------------------------------------------
  get Name() {
    return this.registrationForm.get('name') as FormControl;
  }
  get Email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get Password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get ConfirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get PhoneNumber() {
    return this.registrationForm.get('phoneNumber') as FormControl;
  }
  // -------------------------------------------------------------------------
  // Form submission
  // -------------------------------------------------------------------------
  onSubmit() {
    console.log(this.registrationForm);
  }
}
