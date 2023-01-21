import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent {
  properties: Array<any> = [
    {
      Id: 1,
      Name: 'Alfonzo',
      Type: 'Apartment',
      Price: 35000,
    },
    {
      Id: 2,
      Name: 'Birla',
      Type: 'Building',
      Price: 135000,
    },
    {
      Id: 3,
      Name: 'Prof. Ansar',
      Type: 'Apartment',
      Price: 15000,
    },
    {
      Id: 4,
      Name: 'Chowdhury',
      Type: 'Apartment',
      Price: 45000,
    },
  ];
}
