import { Component, Input, OnInit } from '@angular/core';
import { IProperty } from '../Interfaces/iproperty';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: IProperty;
  imgLoading: boolean = true;

  ngOnInit(): void {
    console.log(this.property);
  }
}
