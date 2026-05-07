import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  /** Clima del Pais */

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

  /** Historico de clima por mes */

  getMonthlyStats(lat: number, lng: number): Observable<any[]> {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=2023-01-01&end_date=2023-12-31&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    return this.http.get<any>(url).pipe(
      map(res => this.calculateMonthlyAverages(res.daily))
    );
  }

  private calculateMonthlyAverages(daily: any): any[] {
    const monthlyData: any[] = [];

    // Creamos 12 contenedores para los meses
    for (let m = 0; m < 12; m++) {
      const monthDaysMax = daily.temperature_2m_max.filter((_: any, index: number) =>
        new Date(daily.time[index]).getMonth() === m
      );
      const monthDaysMin = daily.temperature_2m_min.filter((_: any, index: number) =>
        new Date(daily.time[index]).getMonth() === m
      );

      const avgMax = monthDaysMax.reduce((a: number, b: number) => a + b, 0) / monthDaysMax.length;
      const avgMin = monthDaysMin.reduce((a: number, b: number) => a + b, 0) / monthDaysMin.length;

      monthlyData.push({
        month: m + 1,
        tempMax: avgMax,
        tempMin: avgMin
      });
    }
    return monthlyData;
  }
}
