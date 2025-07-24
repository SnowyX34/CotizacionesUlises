import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { AddToCartDTO } from '@shared/dto/cart.dto';  // Asegúrate de tener esta interfaz

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cart';
  }

  addToCart(cartData: AddToCartDTO): Observable<Cart> {
    return this.http.post<Cart>(`${this.myAppUrl}${this.myApiUrl}`, cartData);
  }

  updateCart(id: string, cartData: Partial<AddToCartDTO>): Observable<Cart> {
    return this.http.put<Cart>(`${this.myAppUrl}${this.myApiUrl}/${id}`, cartData);
  }

  deleteCartItem(id: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getAllCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
