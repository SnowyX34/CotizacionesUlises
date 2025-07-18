// src/app/auth/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../../../../../backend/src/domain/dto/product.dto';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products';
    
    // ✅ DEBUG: Verificar configuración
    console.log('=== CONFIGURACIÓN SERVICIO ===');
    console.log('environment.endpoint:', environment.endpoint);
    console.log('myAppUrl:', this.myAppUrl);
    console.log('myApiUrl:', this.myApiUrl);
    console.log('==============================');
  }

  getAll(): Observable<Products[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    console.log('URL para obtener productos:', url);
    return this.http.get<Products[]>(url);
  }

  addProductFormData(formData: FormData): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/add`;
    console.log('URL para agregar producto:', url);
    return this.http.post(url, formData);
  }

  updateProduct(product: Products): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${product.product_id}`;
    console.log('URL para actualizar producto:', url);
    return this.http.put(url, product);
  }

  updateProductFormData(id: number, formData: FormData): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
    console.log('URL para actualizar producto con FormData:', url);
    return this.http.put(url, formData);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
    console.log('URL para eliminar producto:', url);
    return this.http.delete(url);
  }

  // ✅ MÉTODO CON DEBUG COMPLETO
  getImageUrl(imagePath: string): string {
    console.log('=== DEBUG getImageUrl ===');
    console.log('imagePath recibido:', imagePath);
    console.log('environment.endpoint:', environment.endpoint);
    console.log('myAppUrl:', this.myAppUrl);
    
    if (!imagePath) {
      const defaultUrl = `${this.myAppUrl}uploads/default-product.png`;
      console.log('Sin imagen, usando default:', defaultUrl);
      return defaultUrl;
    }
    
    // Si la ruta ya incluye el dominio, devolverla tal como está
    if (imagePath.startsWith('http')) {
      console.log('URL completa encontrada:', imagePath);
      return imagePath;
    }
    
    // Construir la URL completa
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const finalUrl = `${this.myAppUrl}${cleanPath}`;
    
    console.log('cleanPath:', cleanPath);
    console.log('URL final construida:', finalUrl);
    console.log('========================');
    
    return finalUrl;
  }
}