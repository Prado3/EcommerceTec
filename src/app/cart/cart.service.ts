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
  providedIn: 'root', // Esto lo hace disponible en toda la aplicación
})
export class CartService {
  private cartItems: Product[] = []; // Array para almacenar los productos en el carrito
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems); // Sujeto para manejar el estado del carrito
  cart$ = this.cartSubject.asObservable(); // Observable para que otros componentes puedan suscribirse a los cambios del carrito

  addToCart(product: Product) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++; // Aumenta la cantidad si el producto ya está en el carrito
    } else {
      this.cartItems.push({ ...product, quantity: 1 }); // Agrega el producto nuevo con cantidad 1
    }
    this.cartSubject.next(this.cartItems); // Notifica a los suscriptores sobre el cambio
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id); // Elimina el producto del carrito
    this.cartSubject.next(this.cartItems); // Notifica a los suscriptores sobre el cambio
  }

  updateQuantity(product: Product, quantity: number) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = quantity; // Actualiza la cantidad del producto
      this.cartSubject.next(this.cartItems); // Notifica a los suscriptores sobre el cambio
    }
  }

  getTotal(): number {
    // Calcula el total del carrito
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  saveCart(): Observable<string> {
    // Simula guardar el carrito y devuelve un mensaje
    return of('Carrito guardado exitosamente');
  }
}
