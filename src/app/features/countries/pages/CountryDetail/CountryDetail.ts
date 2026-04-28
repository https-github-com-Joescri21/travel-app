import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountryInfo } from "../../components/country-info/country-info";
import { CommonModule } from '@angular/common';
import { Country } from '../../../../core/models/country.model';

@Component({
  selector: 'app-country-detail',
  imports: [
    RouterLink,
    CommonModule,
    CountryInfo
],
  templateUrl: './CountryDetail.html',
})
export class CountryDetail {

  country = input.required<Country>();

}
