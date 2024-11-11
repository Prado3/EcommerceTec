import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
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

  saveCart(): Observable<string> {
    return of('Carrito guardado exitosamente');
  }
}