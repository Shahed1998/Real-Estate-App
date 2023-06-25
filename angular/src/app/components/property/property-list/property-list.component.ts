import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { IPropertyBase } from 'src/app/model/property/iproperty-base';
import { TitleService } from 'src/app/services/title.service';
import { Property } from 'src/app/model/property/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties!: Array<IPropertyBase>;
  SellRent: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiservice: ApiService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    var param = this.activatedRoute.snapshot.url.toString();
    if (param === 'rent-property') {
      this.SellRent = 2;
      this.titleService.setTitle(`Rent Property`);
    } else {
      this.titleService.setTitle(`Buy Property`);
    }
    this.apiservice.getAllProperties(this.SellRent).subscribe(
      (res) => {
        this.properties = res; // list of properties from json data
        if (localStorage.getItem('property')) {
          // Gets a list of property from the localStorage
          let propertyList = JSON.parse(localStorage.getItem('property')!);

          propertyList.forEach((prop: Property) => {
            // type checking is intentionally ignored below
            if (prop.SellRent == this.SellRent)
              // this.properties = [prop, ...res];
              this.properties.push(prop);
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
