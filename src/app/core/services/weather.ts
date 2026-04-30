import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Weather {


  private http = inject(HttpClient);
  private apikey = '...';

}
