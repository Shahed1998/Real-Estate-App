import { Component, OnInit, inject } from '@angular/core';
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
import { TitleService } from 'src/app/services/title.service';
import { CountryService } from 'src/app/services/country/country.service';
import { ICountry } from 'src/app/model/icountry';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  // Dependency Injections
  fb = inject(FormBuilder);
  userService = inject(UserService);
  toastr = inject(ToastrService);
  titleService = inject(TitleService);
  activatedRoute = inject(ActivatedRoute);

  // Properties
  registrationForm!: FormGroup;
  users!: User;
  countries!: ICountry[];
  registerBtnPressed: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.countries = data['countries'];
    });
    console.log(this.countries);
    this.titleService.setTitle('User Register');
    this.createRegistrationForm();
    this.CountryCode;
    // this.registrationForm.valueChanges.subscribe((res) => {
    //   // this.CountryCode;
    // });
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        name: [null, [Validators.required]],
        email: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        country: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required, Validators.maxLength(11)]],
      },
      {
        validators: [this.emailValidationFn, this.confirmPasswordValidationFn],
      }
    );
  }

  // Custom validation function
  confirmPasswordValidationFn(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { confirmPassNotMatched: true };
  }

  // Email validation function
  emailValidationFn(control: AbstractControl) {
    // Email validation regular expression
    var regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(control.get('email')!.value)
      ? null
      : { invalidEmail: true };
  }

  // Register
  register() {
    this.registerBtnPressed = true;
    console.log(this.registrationForm.hasError('invalidEmail'));
    if (!this.registrationForm.valid) {
    }
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
  get Country() {
    return this.registrationForm.get('country') as FormControl;
  }
  get CountryCode() {
    let countryId = this.Country.value;
    if (!this.Country.value) {
      return;
    }
    return this.countries.find((x) => x.id == countryId)?.countryCallingCode;
  }

  // -------------------------------------------------------------------------
  // Form submission
  // -------------------------------------------------------------------------
  onSubmit() {
    if (this.registrationForm.valid) {
      this.userService.addUsers(this.userData());
      // Toaster message
      this.toastr.success('User added successfully', 'Success');
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
