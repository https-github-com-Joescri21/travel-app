import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  getWeather(lat: number, lng: number): Observable<any> {
    const params = {
      latitude: lat,
      longitude: lng,
      current_weather: true,
      timezone: 'auto'
    };

    return this.http.get(this.apiUrl, { params }).pipe(
      map((res: any) => res.current_weather)
    );
  }
}
