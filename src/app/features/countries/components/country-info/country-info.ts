import { Component, input } from '@angular/core';
import { Country } from '../../../../core/models/country.model';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-info',
  imports: [
    CommonModule,
    DecimalPipe
  ],
  templateUrl: './country-info.html',
})
export class CountryInfo {

  country = input.required<Country>();

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
}
