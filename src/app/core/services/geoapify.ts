import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Geoapify {

  private http = inject(HttpClient);
  private baseUrl = 'https://api.geoapify.com/v2/places';

  getTopCountryAttractions(countrycode: string, limit: number = 20):Observable<any> {

    const category = 'tourism.sights,entertainment.culture,heritage';
    const filter = `countrycode:${countrycode.toLocaleLowerCase()}`;

    const apiKey = environment.geoapifyApiKey
    const url = `${this.baseUrl}?categories=${category}&filter=${filter}&bias=popularity&limit=${limit}&apiKey=${apiKey}`;

    return this.http.get<any>(url).pipe(
      // Mapeamos la respuesta GeoJSON para entregar un arreglo limpio al componente
      map(response => response.features.map((f: any) => ({
        name: f.properties.name || f.properties.formatted,
        category: f.properties.categories[0],
        address: f.properties.address_line2,
        placeId: f.properties.place_id
      })))
    );

  }
}
