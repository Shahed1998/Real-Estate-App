import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { IProperty } from '../Interfaces/iproperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties!: Array<IProperty>;
  SellRent: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    var param = this.activatedRoute.snapshot.url.toString();
    if (param) {
      this.SellRent = 2;
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
