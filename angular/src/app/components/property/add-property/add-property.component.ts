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
import { IPropertyBase } from 'src/app/model/property/iproperty-base';
import { TitleService } from 'src/app/services/title.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Property } from 'src/app/model/property/property';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  // --------------------------------------------------------------------------------
  // Class properties declarations
  // --------------------------------------------------------------------------------
  clickModal!: number; // undefined so that it does not trigger the modal initially
  addPropertyForm!: FormGroup;
  fb = inject(FormBuilder);
  propertyService = inject(ApiService);
  modalService = inject(BsModalService);
  titleService = inject(TitleService);
  bhk = [1, 2, 3, 4];
  propertyType = ['House', 'Apartment', 'Duplex'];
  furnishType = ['Fully', 'Semi', 'Unfurnished'];
  mainEntrance = ['East', 'West', 'North', 'South'];
  nextClicked = false;
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
    Address: '',
  };
  pricingAreaTabDisabled = true;
  property = new Property();
  @ViewChild('pricingArea') pA!: ElementRef;
  @ViewChild('basicInfo') bI!: ElementRef;
  @ViewChild('address') add!: ElementRef;
  @ViewChild('otherDetails') odt!: ElementRef;
  @ViewChild('photos') photo!: ElementRef;
  files: File[] = [];
  disableImageUpload: boolean = false;

  // --------------------------------------------------------------------------------
  // Method declarations
  // --------------------------------------------------------------------------------
  constructor() {}

  ngOnInit(): void {
    this.titleService.setTitle('List Property Free');
    this.addPropertyFormBuilder();
    // detects value change in the form
    this.addPropertyForm.valueChanges.subscribe((data) => {
      this.propertyView.Name = data.BasicInfo.name;
      this.propertyView.PropertyType = data.BasicInfo.PropertyType;
      this.propertyView.City = data.BasicInfo.City;
      this.propertyView.Price = data.PriceInfo.pAPrice;
      this.propertyView.BHK = data.BasicInfo.BHK;
    });
    // console.log(this.PropertyName);
  }

  addPropertyFormBuilder() {
    this.addPropertyForm = this.fb.group({
      // Basic info tab
      BasicInfo: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        City: ['', [Validators.required]],
        SellRent: ['1', [Validators.required]],
        BHK: ['', [Validators.required]],
        PropertyType: ['', [Validators.required]],
        FurnishType: ['', [Validators.required]],
      }),
      // Pricing and Area tab
      PriceInfo: this.fb.group({
        pAPrice: ['', [Validators.required]],
        pASecurity: [''],
        pAMaintenance: [''],
        pABuiltArea: ['', [Validators.required]],
        pACarpetArea: [''],
      }),
      // Address tab
      AddressInfo: this.fb.group({
        AddFloor: [''],
        AddTotalFloors: [''],
        AddAddress: ['', [Validators.required]],
        AddLandmark: [''],
      }),
      // Others tab
      OtherInfo: this.fb.group({
        otTabRTM: ['', Validators.required], // ready to move field
        otTabAF: [new Date()], // sets date to current date initially
        otTabAOP: [''], // Age of property
        otTabGC: [''], // Gated community
        otTabME: [''], // Main entrance
        otTabDesc: [''], // Description
      }),
    });
  }

  tabChangeBtn(openTab: string, btnPressedNext: boolean = false) {
    this.nextClicked = true;
    if (btnPressedNext) {
      if (openTab === 'pricingArea' && this.BasicInfo.valid) {
        this.pA.nativeElement.click();
      }

      if (
        openTab === 'address' &&
        this.BasicInfo.valid &&
        this.PriceInfo.valid
      ) {
        this.add.nativeElement.click();
      }

      if (
        openTab === 'otherDetails' &&
        this.BasicInfo.valid &&
        this.PriceInfo.valid &&
        this.AddressInfo.valid
      ) {
        this.odt.nativeElement.click();
      }
      if (
        openTab === 'photos' &&
        this.BasicInfo.valid &&
        this.PriceInfo.valid &&
        this.AddressInfo.valid &&
        this.OtherInfo.valid
      ) {
        this.photo.nativeElement.click();
      }
    } else {
      if (openTab === 'basicInfo') this.bI.nativeElement.click();
      if (openTab === 'pricingArea') this.pA.nativeElement.click();
      if (openTab === 'address') this.add.nativeElement.click();
      if (openTab === 'otherDetails') this.odt.nativeElement.click();
      if (openTab === 'photos') this.photo.nativeElement.click();
    }
  }

  //
  tabActive() {
    this.nextClicked = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(): void {
    if (this.addPropertyForm.valid) {
      this.propertyService.addProperty(this.mapProperty());
    }
    return;
  }

  mapProperty(): Property {
    this.property.Id = null;
    this.property.SellRent = this.BasicInfo.value.SellRent;
    this.property.BHK = this.BasicInfo.value.BHK;
    this.property.PropertyType = this.BasicInfo.value.PropertyType;
    this.property.FurnishType = this.BasicInfo.value.FurnishType;
    this.property.Name = this.BasicInfo.value.name;
    this.property.City = this.BasicInfo.value.City;
    this.property.Price = this.PriceInfo.value.pAPrice;
    this.property.Security = this.PriceInfo.value.pASecurity;
    this.property.Maintenance = this.PriceInfo.value.pAMaintenance;
    this.property.BuiltArea = this.PriceInfo.value.pABuiltArea;
    this.property.CarpetArea = this.PriceInfo.value.pACarpetArea;
    this.property.Floor = this.AddressInfo.value.AddFloor;
    this.property.TotalFloors = this.AddressInfo.value.AddTotalFloors;
    this.property.Address = this.AddressInfo.value.AddAddress;
    this.property.Landmark = this.AddressInfo.value.AddLandmark;
    this.property.ReadyToMove = this.OtherInfo.value.otTabRTM;
    this.property.AvailableFrom = this.OtherInfo.value.otTabAF.toString();
    this.property.AOP = this.OtherInfo.value.otTabAOP;
    this.property.GatedCommunity = this.OtherInfo.value.otTabGC;
    this.property.MainEntrance = this.OtherInfo.value.otTabME;
    this.property.Description = this.OtherInfo.value.otTabDesc;
    this.property.PostedOn = new Date().toString();
    return this.property;
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
      Address: '',
    };
    this.bI.nativeElement.click();
  }

  onSelect(event: any) {
    console.log(event);
    this.disableImageUpload = true;
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.disableImageUpload = false;
    this.files.splice(this.files.indexOf(event), 1);
  }

  // --------------------------------------------------------------------------
  // Getter Methods

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

  // Getters for Basic Info Tab
  get PropertyName() {
    return this.BasicInfo.get('name') as FormControl;
  }
  get CityName() {
    return this.BasicInfo.get('City') as FormControl;
  }

  // Getters for Pricing and Area Tab
  get Price() {
    return this.PriceInfo.get('pAPrice') as FormControl;
  }
  get BuiltArea() {
    return this.PriceInfo.get('pABuiltArea') as FormControl;
  }
  // Getters for Address Tab
  get Address() {
    return this.AddressInfo.get('AddAddress') as FormControl;
  }
  // Getters for Others Tab
  get ReadyToMove() {
    return this.OtherInfo.get('otTabRTM') as FormControl;
  }

  // --------------------------------------------------------------------------
  // Method for activating property preview modal
  // Initially the clickModal property is undefined, so the modal doesn't show.
  // When the preview button is pressed, value of the clickModal is changed,
  // the changed clickModal property is sent to the child app-property-preview component
  // to activate the ngOnChanges lifecycle hook in app-property-preview component
  modalActive() {
    if (this.clickModal === 1) this.clickModal = 2;
    else this.clickModal = 1;
  }
}
