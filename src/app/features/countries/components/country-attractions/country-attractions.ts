import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Geoapify } from '../../../../core/services/geoapify';
import { Country } from '../../../../core/models/country.model';

@Component({
  selector: 'country-attractions',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './country-attractions.html',
})
export class CountryAttractions {

  private geoapifyService = inject(Geoapify);
  private _countryCode: string = '';
  private _lat?: number;
  private _lng?: number;

  @Input()
  set countryCode(val: string) {
    if (val) {
      this._countryCode = val;
      console.log('🔔 Sensor activado en el Hijo! Código recibido:', val);
    }
  }

  get countryCode(): string {
    return this._countryCode;
  }

  @Input()
  set lat(value: number | undefined) {
    this._lat = value;
    this.tryLoadAttractions();
  }

  @Input()
  set lng(value: number | undefined) {
    this._lng = value;
    this.tryLoadAttractions();
  }

  public attractions: any[] = [];
  public isLoading: boolean = false;
  public errorMessage: string | null = null;

  private tryLoadAttractions(): void {
    if (this._lat == null || this._lng == null) {
      return;
    }

    this.loadAttractions();
  }

  private loadAttractions(): void {
    const lat = this._lat;
    const lng = this._lng;

    if (lat == null || lng == null) {
      this.errorMessage = 'Coordenadas no disponibles para buscar lugares.';
      return;
    }

    this.errorMessage = null;
    // Volvemos la tarea asíncrona para que Angular pinte la interfaz de forma limpia
    setTimeout(() => {
      this.isLoading = true;
      console.log('🚀 Despegando petición HTTP hacia el servicio Geoapify...');

      this.geoapifyService.getTopCountryAttractions(lat, lng, 20).subscribe({
        next: (data) => {
          // ⏳ Metemos la asignación en un proceso asíncrono seguro
          setTimeout(() => {
            this.attractions = data; // 🏛️ Guardamos los 20 registros reales
            this.isLoading = false;
          }, 0);

          console.log('✅ ÉXITO TOTAL: Registros devueltos por la API:', data.length);
        },
        error: (err) => {
          console.error('❌ ERROR en la respuesta del servidor:', err);
          this.isLoading = false;
        }
      });
    }, 0);
  }
}
