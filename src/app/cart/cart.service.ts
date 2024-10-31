// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(product: Product, quantity: number) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = quantity;
      this.cartSubject.next(this.cartItems);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Simulación del guardado del carrito
  saveCart(): Observable<string> {
    // Aquí podrías implementar la lógica de guardar en un servidor
    return of('Carrito guardado exitosamente'); // Simula una respuesta exitosa
  }
}
