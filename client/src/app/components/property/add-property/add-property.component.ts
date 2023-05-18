import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;
  fb = inject(FormBuilder);

  pricingAreaTabDisabled = true;
  @ViewChild('pricingArea') pA!: ElementRef;
  @ViewChild('basicInfo') bI!: ElementRef;
  @ViewChild('address') add!: ElementRef;
  @ViewChild('otherDetails') odt!: ElementRef;
  @ViewChild('photos') photo!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.addPropertyFormBuilder();
    if (this.Name.valid && this.Price.valid && this.Type.valid) {
      this.pricingAreaTabDisabled = false;
    } else {
      this.pricingAreaTabDisabled = true;
    }
  }

  addPropertyFormBuilder() {
    this.addPropertyForm = this.fb.group({
      // Basic info tab
      name: [null, [Validators.required, Validators.minLength(5)]],
      type: [null, [Validators.required]],
      price: [null, [Validators.required]],
      // Pricing and Area tab
      pAPrice: [null, [Validators.required]],
      pASecurity: [null, [Validators.required]],
      pAMaintenance: [null, [Validators.required]],
      pABuiltArea: [null, [Validators.required]],
      pACarpetArea: [null, [Validators.required]],
    });
  }

  get Name() {
    return this.addPropertyForm.get('name') as FormControl;
  }

  get Type() {
    return this.addPropertyForm.get('type') as FormControl;
  }

  get Price() {
    return this.addPropertyForm.get('price') as FormControl;
  }

  tabChangeBtn(openTab: string) {
    if (openTab === 'basicInfo') this.bI.nativeElement.click();
    if (openTab === 'pricingArea') this.pA.nativeElement.click();
    if (openTab === 'address') this.add.nativeElement.click();
    if (openTab === 'otherDetails') this.odt.nativeElement.click();
    if (openTab === 'photos') this.photo.nativeElement.click();
  }

  onSubmit() {}
}
