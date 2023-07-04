import { Injectable } from '@angular/core';
import { ICountry } from '../../model/icountry';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<ICountry[]> {
    return this.http.get('data/countries.json').pipe(
      map((data: any) => {
        const countries: Array<ICountry> = [];
        countries.push(...data);
        return countries;
      })
    );
  }
}
