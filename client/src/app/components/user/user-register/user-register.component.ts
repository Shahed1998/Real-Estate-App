import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  users!: User;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required, Validators.maxLength(11)]],
      },
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
    if (this.registrationForm.valid) {
      this.userService.addUsers(this.userData());
      // Toaster message
      this.toastr.success('User added', 'Success', {
        timeOut: 3000,
      });
      this.registrationForm.reset();
    }
  }

  // Mapping user to its model and using it onSubmit
  userData(): User {
    return (this.users = {
      name: this.Name.value,
      email: this.Email.value,
      password: this.Password.value,
      phoneNumber: this.PhoneNumber.value,
    });
  }
}

// // Refactored
//   ngOnInit(): void {
//     // this.registrationForm = new FormGroup(
//     //   {
//     //     name: new FormControl(null, Validators.required),
//     //     email: new FormControl(null, [Validators.required, Validators.email]),
//     //     password: new FormControl(null, [
//     //       Validators.required,
//     //       Validators.minLength(8),
//     //     ]),
//     //     confirmPassword: new FormControl(null, [Validators.required]),
//     //     phoneNumber: new FormControl(null, [
//     //       Validators.required,
//     //       Validators.maxLength(11),
//     //     ]),
//     //   },
//     //   // Custom validation
//     //   { validators: [this.confirmPasswordValidationFn] }
//     // );
//   }
