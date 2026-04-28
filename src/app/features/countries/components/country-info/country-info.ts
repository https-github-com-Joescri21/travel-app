import { Component, Input, input } from '@angular/core';
import { Country } from '../../../../core/models/country.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './country-info.html',
})
export class CountryInfo {
  country = input.required<Country>();
}
