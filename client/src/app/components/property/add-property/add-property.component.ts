import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { IProperty } from '../Interfaces/iproperty';
import { IPropertyBase } from 'src/app/model/iproperty-base';
import { TitleService } from 'src/app/services/title.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;
  fb = inject(FormBuilder);
  modalService = inject(BsModalService);
  titleService = inject(TitleService);
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
  // Ngx-bootstrap modal
  modalRef?: BsModalRef;
  propertyView: IPropertyBase = {
    Id: null,
    SellRent: null,
    Name: '',
    PropertyType: '',
    Price: null,
    Image: '',
    FurnishType: '',
    BHK: null,
    BuiltArea: null,
    ReadyToMove: null,
    City: '',
  };
  pricingAreaTabDisabled = true;
  @ViewChild('pricingArea') pA!: ElementRef;
  @ViewChild('basicInfo') bI!: ElementRef;
  @ViewChild('address') add!: ElementRef;
  @ViewChild('otherDetails') odt!: ElementRef;
  @ViewChild('photos') photo!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.titleService.setTitle('List Property Free');
    this.addPropertyFormBuilder();

    // detects value change in the form
    this.addPropertyForm.valueChanges.subscribe((data) => {
      console.log(data);
      this.propertyView.Name = data.BasicInfo.name;
      this.propertyView.PropertyType = data.BasicInfo.PropertyType;
      this.propertyView.City = data.BasicInfo.City;
      this.propertyView.Price = data.PriceInfo.pAPrice;
      this.propertyView.BHK = data.BasicInfo.BHK;
    });
  }

  addPropertyFormBuilder() {
    this.addPropertyForm = this.fb.group({
      // Basic info tab
      BasicInfo: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        City: ['', [Validators.required]],
        SellRent: ['', [Validators.required]],
        BHK: ['', [Validators.required]],
        PropertyType: ['', [Validators.required]],
        FurnishType: ['', [Validators.required]],
      }),
      // Pricing and Area tab
      PriceInfo: this.fb.group({
        pAPrice: ['', [Validators.required]],
        pASecurity: ['', [Validators.required]],
        pAMaintenance: ['', [Validators.required]],
        pABuiltArea: ['', [Validators.required]],
        pACarpetArea: ['', [Validators.required]],
      }),
      // Address tab
      AddressInfo: this.fb.group({
        AddFloor: ['', Validators.required],
        AddTotalFloors: ['', Validators.required],
        AddAddress: ['', Validators.required],
        AddLandmark: ['', Validators.required],
      }),
      // Others tab
      OtherInfo: this.fb.group({
        otTabRTM: ['', Validators.required], // ready to move field
        otTabAF: [new Date(), [Validators.required]], // sets date to current date initially
        otTabAOP: ['', [Validators.required]], // Age of property
        otTabGC: ['', [Validators.required]], // Gated community
        otTabME: ['', [Validators.required]], // Main entrance
        otTabDesc: ['', [Validators.required]], // Description
      }),
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

  get BasicInfo() {
    return this.addPropertyForm.get('BasicInfo') as FormControl;
  }

  get PriceInfo() {
    return this.addPropertyForm.get('PriceInfo') as FormControl;
  }

  get AddressInfo() {
    return this.addPropertyForm.get('AddressInfo') as FormControl;
  }

  get OtherInfo() {
    return this.addPropertyForm.get('OtherInfo') as FormControl;
  }

  tabChangeBtn(openTab: string) {
    if (openTab === 'basicInfo') this.bI.nativeElement.click();
    if (openTab === 'pricingArea') this.pA.nativeElement.click();
    if (openTab === 'address') this.add.nativeElement.click();
    if (openTab === 'otherDetails') this.odt.nativeElement.click();
    if (openTab === 'photos') this.photo.nativeElement.click();
  }

  onSubmit() {
    console.log(this.BasicInfo, this.PriceInfo);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onReset() {
    this.addPropertyForm.reset();
    this.addPropertyForm.controls['OtherInfo'].patchValue({
      otTabAF: new Date(),
    });
    this.propertyView = {
      Id: null,
      SellRent: null,
      Name: '',
      PropertyType: '',
      Price: null,
      Image: '',
      FurnishType: '',
      BHK: null,
      BuiltArea: null,
      ReadyToMove: null,
      City: '',
    };
    this.bI.nativeElement.click();
  }
}
