import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, signal } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather';

@Component({
  selector: 'weather-history',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weather-history.html',
})
export class WeatherHistory {

  private WeatherService = inject(WeatherService);

  /** inputs for coordenas*/
  @Input() lat?: number;
  @Input() lng?: number;

  public monthlyWeatherData = signal<any[]>([]);
  public isLoading = signal<boolean>(false);
  public hasError = signal<boolean>(false);

  constructor() {
    // 🛡️ Monitor de Coordenadas: Cada vez que lat o lng cambien, se dispara la carga
    effect(() => {
      if (this.lat && this.lng) {
        this.fetchHistoricalWeather();
      }
    }, { allowSignalWrites: true });
  }

  private fetchHistoricalWeather(): void {
    if (!this.lat || !this.lng) return;

    this.isLoading.set(true);
    this.hasError.set(false);

    // Llamamos al servicio de Open-Meteo
    this.WeatherService.getMonthlyStats(this.lat, this.lng).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.monthlyWeatherData.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('❌ Error fetching weather history:', err);
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }

  public getMonthName(monthIndex: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[monthIndex - 1] || '';
  }
}
