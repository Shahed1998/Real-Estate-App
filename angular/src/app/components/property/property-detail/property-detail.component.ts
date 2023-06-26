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

  // Had to initialize so that property doesn't give undefined error
  property: IPropertyBase = {
    Id: null,
    SellRent: null,
    BHK: null,
    PropertyType: '',
    FurnishType: '',
    Name: '',
    City: '',
    Price: null,
    BuiltArea: null,
    Address: '',
    ReadyToMove: null,
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

  get PropertyName() {
    let name = this.property.Name;
    if (name.length > 20) {
      name = name.slice(0, 20) + '.....';
    }
    return name;
  }
}
