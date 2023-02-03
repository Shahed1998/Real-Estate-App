import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IProperty } from '../Interfaces/iproperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties!: Array<IProperty>;

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.apiservice.getAllProperties().subscribe(
      (res) => {
        this.properties = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
