import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Geoapify {

  private http = inject(HttpClient);

  private baseUrl = 'https://api.geoapify.com/v2/places';

  getTopCountryAttractions(countryCode: string, limit: number = 20): Observable<any[]> {

    const category = 'tourism.sights,entertainment.culture,heritage';
    const cca2 = countryCode.substring(0, 2).toLowerCase()
    const filter = `countrycode:${cca2}`;

    const apiKey = environment.geoapifyApiKey;

    const url = `${this.baseUrl}?categories=${category}&filter=${filter}&bias=popularity&limit=${limit}&apiKey=${apiKey}`;

    // 🧪 LA PRUEBA REINA: Imprimimos la URL real en la consola
    console.log('🔗 URL generada para Geoapify:', url);

    return this.http.get<any>(url).pipe(
      map(response => {

        console.log('📦 Respuesta cruda de Geoapify:', response);

        return response.features.map((lugar: any) => ({
          name: lugar.properties.name || lugar.properties.formatted, // Si no tiene nombre comercial, usa la dirección legible
          category: lugar.properties.categories[0], // Guardamos su categoría principal
          address: lugar.properties.address_line2, // Su dirección o zona
          placeId: lugar.properties.place_id // ID único para que el @for de Angular no se confunda
        }));
      })
    );

  }

}
