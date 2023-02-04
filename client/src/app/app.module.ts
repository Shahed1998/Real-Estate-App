import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { PropertyCardComponent } from './components/property/property-card/property-card.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { AddPropertyComponent } from './components/property/add-property/add-property.component';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';

const appRoutes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'rent-property', component: PropertyListComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavbarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
