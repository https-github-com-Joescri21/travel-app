import { Component, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Countries } from '../../../../core/services/countries';
import { Country } from '../../../../core/models/country.model';
import { Router} from "@angular/router";
import { CountryInfo } from "../../components/country-info/country-info";



@Component({
  selector: 'country-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CountryInfo
],
  templateUrl: './country-home.html',
  styles: ``,
})
export class CountryHome {

  private countryService = inject(Countries);
  private router = inject(Router);

  public countries = signal<Country[]>([]);
  public searchTerm= '';
  public error = signal<string | null>(null);

  countrysearch(){
    const search = this.searchTerm.trim();

    //No gastar peticiones en texto vacios o muy cortos
    if( search.length < 3) return;

    this.countryService.getCountryByName(search).subscribe({
      next: (data) => {
        this.countries.set(data);
        this.error.set(null);
      },
      error: () => {
        this.error.set('No encontramos ese destino. ¡Prueba con otro!');
      }
    });
  }

  // Traduccion de continentes
  public traducirContinente(continente: string): string {
    const traducciones: {[key: string]: string} = {
      'Africa': 'África',
      'Antarctica': 'Antártida',
      'Asia': 'Asia',
      'Europe': 'Europa',
      'North America': 'Norteamérica',
      'South America': 'Sudamérica',
      'Oceania': 'Oceanía'
    };
    return traducciones[continente] || continente;
  }

  public paisSeleccionado = signal<Country | null>(null);


//Ver Detalles del pais
  verDetalles(id: string) {
    // 1. Buscamos el país en nuestra lista actual usando el ID
    const encontrado = this.countries().find(c => c.cca3 === id);
    if (encontrado) {
      this.paisSeleccionado.set(encontrado);
      this.router.navigate(['/country', id]);
      // 2. Aquí es donde el jueves dispararemos la petición a la API del Clima
      console.log('Cargando clima para:', encontrado.capital[0]);
    }
  }



}
