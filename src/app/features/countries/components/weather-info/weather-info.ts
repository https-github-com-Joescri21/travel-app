import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather';

@Component({
  selector: 'weather-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weather-info.html',
})
export class WeatherInfo {

  private weatherService = inject(WeatherService);

  lat = input.required<number>();
  lng = input.required<number>();

  weatherData = signal<any>(null);
  isLoading = signal<boolean>(false);

  constructor() {

    effect(() => {
      const lat = this.lat();
      const lng = this.lng();

      Promise.resolve().then(() => {
        this.fetchWeather(lat, lng);
      });
    });
  }

  fetchWeather(lat: number, lng: number) {
    this.isLoading.set(true);
    this.weatherService.getWeather(lat, lng).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false)
      }
    });
  }



}
