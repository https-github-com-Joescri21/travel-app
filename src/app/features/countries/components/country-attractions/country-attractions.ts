import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, SimpleChanges, Input, OnChanges, input } from '@angular/core';
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
export class CountryAttractions implements OnInit {

  private goeapifyService = inject(Geoapify);

  @Input() countryCode: string = '';

  public attractions: any[] = [];
  public isLoading: boolean = false;

  ngOnInit(): void {
    console.log('🧪 Componente hijo montado. Código recibido inicialmente:', this.countryCode);


  }

  private runLoandTest(): void {
    setTimeout(() => {
      this.isLoading = true;

      this.goeapifyService.getTopCountryAttractions(this.countryCode, 20).subscribe({
        next: (data) => {
          this.attractions = data;
          this.isLoading = false;
          console.log('✅ API Geoapify respondió con éxito. Registros:', data.length);
        },
        error: (err) => {
          console.error('❌ Error en la petición de Geoapify:', err);
          this.isLoading = false;
        }
      });
    }, 0);
  }
}
