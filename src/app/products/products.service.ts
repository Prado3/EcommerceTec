import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://fakestoreapi.com/products'; // URL de la API
  private defaultPrice = 10.99; // Precio predeterminado si no está presente

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(products => products.map(product => ({
        ...product,
        price: product.price ?? this.defaultPrice, // Asigna precio predeterminado si falta
        category: product.category ?? 'General' // Asigna categoría predeterminada si falta
      })))
    );
  }

  // Método para obtener un producto por ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

}
