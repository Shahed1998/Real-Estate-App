import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPropertyBase } from 'src/app/model/property/iproperty-base';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  // Dependency injections
  propertyService = inject(ApiService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  propertyId!: number;

  // Countries
  countries = [
    { id: 1, name: 'Bangladesh' },
    { id: 2, name: 'India' },
    { id: 3, name: 'USA' },
  ];

  // Cities of Bangladesh
  cities = [
    { id: 1, name: 'Dhaka' },
    { id: 2, name: 'Sylhet' },
    { id: 3, name: 'Chittagong' },
    { id: 4, name: 'Khulna' },
    { id: 5, name: 'Rajshahi' },
    { id: 6, name: 'Barisal' },
    { id: 7, name: 'Mymensingh' },
    { id: 7, name: 'Comilla' },
    { id: 8, name: 'Rangpur' },
  ];

  // Had to initialize so that property doesn't give undefined error
  property: IPropertyBase = {
    Id: null,
    SellRent: null,
    BHK: null,
    PropertyType: '',
    FurnishType: '',
    Name: '',
    City: null,
    Country: null,
    Price: null,
    BuiltArea: null,
    Address: '',
    ReadyToMove: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.propertyId = this.activatedRoute.snapshot.params['id'];
    // console.log(this.propertyId);
    // this.router.navigate(['/']);
    this.propertyService.getPropertyById(this.propertyId).subscribe((res) => {
      this.property = res;
      console.log(this.property);
    });
  }

  // assigns a default image if image not found
  imgError() {
    this.property.Image = 'image-not-found.jpg';
  }

  // ----------------------------------------------------------------------------
  // Getters
  // ----------------------------------------------------------------------------
  get PropertyName() {
    let name = this.property.Name;
    if (!name) {
      name = 'Anonymous';
    }
    if (name.length > 20) {
      name = name.slice(0, 20) + '.....';
    }
    return name;
  }

  get BHK() {
    return this.property.BHK;
  }

  get Price() {
    return this.property.Price;
  }

  get City() {
    return this.cities.find((x) => x.id == this.property.City)?.name;
  }

  get Country() {
    return this.countries.find((x) => x.id == this.property.Country)?.name;
  }

  get BuiltArea() {
    return this.property.BuiltArea;
  }

  get CarpetArea() {
    return this.property.CarpetArea;
  }

  get FurnishType() {
    return this.property.FurnishType;
  }

  get MainEntrance() {
    return this.property.MainEntrance;
  }

  get FloorNumber() {
    return this.property.Floor;
  }

  get GatedCommunity() {
    return this.property.GatedCommunity;
  }

  get AOP() {
    return this.property.AOP;
  }

  get SecurityDeposit() {
    return this.property.Security;
  }

  get ReadyToMove() {
    if (this.property.ReadyToMove === 'Yes') {
      return 'Ready to move';
    }
    return 'Not ready to move';
  }

  get Maintenance() {
    return this.property.Maintenance;
  }

  get PropertyDescription() {
    return this.property.Description;
  }

  get Image() {
    return this.property.Image;
  }

  get Address() {
    let address = `${this.property.Address}`;
    if (this.City) {
      address += `, ${this.City}`;
    }

    if (this.Country) {
      address += `, ${this.Country}`;
    }
    return address;
  }
}
