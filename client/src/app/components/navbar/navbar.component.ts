import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  onLogin() {
    return localStorage.getItem('token');
  }
  onLogout() {
    localStorage.removeItem('token');
  }
}
