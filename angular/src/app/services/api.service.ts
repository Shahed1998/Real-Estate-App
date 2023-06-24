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

  addProperty(property: Property): void {
    // ----------------------Removed when DB added----------------------
    let pid = Number(localStorage.getItem('PID'));

    if (!pid) pid = 101;
    else pid += 1;

    property.Id = pid;
    localStorage.setItem('PID', `${pid}`);
    localStorage.setItem('property', JSON.stringify(property));
    // ------------------------------------------------------------------
  }
}
