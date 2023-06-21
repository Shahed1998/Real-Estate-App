import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { IPropertyBase } from 'src/app/model/iproperty-base';
import { TitleService } from 'src/app/services/title.service';

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
    if (param) {
      this.SellRent = 2;
      this.titleService.setTitle(`Rent Property`);
    } else {
      this.titleService.setTitle(`Buy Property`);
    }
    this.apiservice.getAllProperties(this.SellRent).subscribe(
      (res) => {
        this.properties = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
