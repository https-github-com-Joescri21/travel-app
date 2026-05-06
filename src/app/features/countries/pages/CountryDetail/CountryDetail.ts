import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryInfo } from '../../components/country-info/country-info';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Country } from '../../../../core/models/country.model';
import { Countries } from '../../../../core/services/countries';
import { CommonModule } from '@angular/common';
import { WeatherInfo } from "../../components/weather-info/weather-info";
import { CountryAttractions } from "../../components/country-attractions/country-attractions";

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [
    CommonModule,
    CountryInfo,
    RouterLink,
    WeatherInfo,
    CountryAttractions
],
  templateUrl: './CountryDetail.html',
})
export class CountryDetail implements OnInit{

  public selectCountry = signal<Country | null>(null);

  private route = inject(ActivatedRoute);
  private countryService = inject(Countries);


  ngOnInit(): void {
    const countryId = this.route.snapshot.paramMap.get('id');

    console.log(countryId);

    if (countryId) {
      this.countryService.getCountryByCode(countryId).subscribe({
        next: (country: Country) => {
          this.selectCountry.set(Array.isArray(country) ? country[0] : country);
        }
      })
  }
  }


}
