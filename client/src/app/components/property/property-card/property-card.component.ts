import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IPropertyBase } from 'src/app/model/iproperty-base';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: IPropertyBase;
  @Input() showWishList: boolean = true;
  @Input() detailsBtnDisabled: boolean = false;
  @ViewChild('wishlistSpan') wishlistPressed!: ElementRef;
  imgLoading: boolean = true;
  loggedInUser!: string | null;
  wishListed: boolean = false;

  ngOnInit(): void {}

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

  imageFailed() {
    this.property.Image = 'image-not-found';
  }
}
