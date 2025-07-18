import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cotizacion } from '../../../../../backend/src/infrestructure/orm/models/cart.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cotizacion'
   }
   addToCart(item: Cotizacion): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/cotizar`, item);
   }
}