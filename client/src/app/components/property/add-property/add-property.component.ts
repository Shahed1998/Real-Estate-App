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
import { IProperty } from '../Interfaces/iproperty';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;
  fb = inject(FormBuilder);
  bhk = [1, 2, 3, 4];
  propertyType = ['House', 'Apartment', 'Duplex'];
  furnishType = ['Fully', 'Semi', 'Unfurnished'];
  mainEntrance = ['East', 'West', 'North', 'South'];
  // <!-- Ngx-bootstrap datepicker -->
  bsConfig = {
    isAnimated: true,
    containerClass: 'theme-dark-blue',
    dateInputFormat: 'DD/MM/YYYY',
  };
  propertyView: IProperty = {
    Id: null,
    SellRent: null,
    Name: '',
    Type: '',
    Price: null,
    Image: '',
  };
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

    // detects value change in the form
    this.addPropertyForm.valueChanges.subscribe((data) => {
      this.propertyView.Name = data.name;
      this.propertyView.Type = data.PropertyType;
      this.propertyView.Price = data.pAPrice;
    });
  }

  addPropertyFormBuilder() {
    this.addPropertyForm = this.fb.group({
      // Basic info tab
      name: ['', [Validators.required, Validators.minLength(5)]],
      City: ['', [Validators.required]],
      SellRent: ['', [Validators.required]],
      BHK: ['', [Validators.required]],
      PropertyType: ['', [Validators.required]],
      FurnishType: ['', [Validators.required]],
      // Pricing and Area tab
      pAPrice: ['', [Validators.required]],
      pASecurity: ['', [Validators.required]],
      pAMaintenance: ['', [Validators.required]],
      pABuiltArea: ['', [Validators.required]],
      pACarpetArea: ['', [Validators.required]],
      // Address tab
      AddFloor: ['', Validators.required],
      AddTotalFloors: ['', Validators.required],
      AddAddress: ['', Validators.required],
      AddLandmark: ['', Validators.required],
      // Others tab
      otTabRTM: ['', Validators.required], // ready to move field
      otTabAF: [new Date(), [Validators.required]], // sets date to current date initially
      otTabAOP: ['', [Validators.required]], // Age of property
      otTabGC: ['', [Validators.required]], // Gated community
      otTabME: ['', [Validators.required]], // Main entrance
      otTabDesc: ['', [Validators.required]], // Description
    });
  }

  get Name() {
    return this.addPropertyForm.get('name') as FormControl;
  }

  get Type() {
    return this.addPropertyForm.get('PropertyType') as FormControl;
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

  onReset() {
    this.addPropertyForm.reset();
    this.addPropertyForm.patchValue({
      otTabAF: new Date(),
      // // Basic info
      // SellRent: 'sell',
      // BHK: '1',
      // PropertyType: 'House',
      // FurnishType: 'Fully',
      // // Other details
      // otTabRTM: 'Yes',
      // otTabGC: 'Yes',
    });
  }
}
