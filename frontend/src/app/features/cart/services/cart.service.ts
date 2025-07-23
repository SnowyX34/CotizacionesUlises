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
  private readonly myUserApi: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'cart';
    this.myUserApi = 'user';
  }
  addToCart(cartItem: AddToCartDTO) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, cartItem);
  }

  getCart() {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCartByUser(userId: number): Observable<AddToCartDTO[]> {
    return this.http.get<AddToCartDTO[]>(`${this.myAppUrl}${this.myUserApi}/user/${userId}`);
  }

  updateCart(id: number, cartItem: Partial<AddToCartDTO>) {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, cartItem);
  }

  deleteCart(id: number) {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
}

