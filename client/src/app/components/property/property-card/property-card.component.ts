import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProperty } from '../Interfaces/iproperty';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: IProperty;
  @ViewChild('wishlistSpan') wishlistPressed!: ElementRef;
  imgLoading: boolean = true;
  loggedInUser!: string | null;
  wishListed: boolean = false;

  ngOnInit(): void {
    // console.log(this.property);
  }

  onLogin() {
    this.loggedInUser = localStorage.getItem('token');
    return this.loggedInUser;
  }

  Wishlist() {
    if (!this.wishListed) {
      this.wishListed = true;
      this.wishlistPressed.nativeElement.classList.add('wishlist-pressed');
      console.log();
    } else if (this.wishListed) {
      this.wishListed = false;
      this.wishlistPressed.nativeElement.classList.remove('wishlist-pressed');
    }
  }
}
