import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IPropertyBase } from '../model/property/iproperty-base';
import { Property } from '../model/property/property';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        const properties: Array<IPropertyBase> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            properties.push(data[id]);
          }
        }
        return properties;
      })
    );
  }

  getPropertyById(id: number): Observable<IPropertyBase> {
    // ----------------------Will be updated when DB added----------------------
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        let property!: IPropertyBase;
        property = data.find((prop: IPropertyBase) => prop.Id === Number(id));
        // If property not available in json data, it checks localStorage
        if (!property) {
          let storedProps: Array<IPropertyBase> = JSON.parse(
            localStorage.getItem('property')!
          );
          // If property not available in localStorage, returns null
          if (storedProps) {
            property = storedProps.find(
              (prop: IPropertyBase) => prop.Id === Number(id)
            )!;
          }
        }
        return property;
      })
    );
  }

  addProperty(property: Property): void {
    // ----------------------Will be updated when DB added----------------------
    let pid = Number(localStorage.getItem('PID'));
    let storedProperty: Array<Property> = [];

    if (!pid) pid = 101;
    else pid += 1;

    property.Id = pid;
    localStorage.setItem('PID', `${pid}`);

    if (localStorage.getItem('property')) {
      storedProperty = JSON.parse(localStorage.getItem('property')!);
    }

    storedProperty = [...storedProperty, property];

    localStorage.setItem('property', JSON.stringify(storedProperty));
    // ------------------------------------------------------------------
  }
}
