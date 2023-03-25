import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PropertyCardComponent } from './components/property/property-card/property-card.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { AddPropertyComponent } from './components/property/add-property/add-property.component';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserService } from './services/user.service';

const appRoutes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'rent-property', component: PropertyListComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: '**', component: PageNotFoundComponent, data: { navbar: false } },
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavbarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
