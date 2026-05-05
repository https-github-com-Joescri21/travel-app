import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, effect } from '@angular/core';
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

  private geoapifyService = inject(Geoapify);

  countrycode = input.required<Country>();

  public attractions: any[] = [];
  public cargando: boolean = false;

  constructor() {
    effect(() => {
      if (this.countrycode()) {
        this.cargarLugares();
      }
    });
  }

  ngOnInit(): void {
    // No es necesario aquí, ya que effect maneja los cambios
  }

  private cargarLugares(): void {
    this.cargando = true;
    this.geoapifyService.getTopCountryAttractions(this.countrycode().cca2, 20).subscribe({
      next: (data) => {
        this.attractions = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando atractivos en el componente:', err);
        this.cargando = false;
      }
    });
  }

}
