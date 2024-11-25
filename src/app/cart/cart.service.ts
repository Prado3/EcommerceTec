import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Card {
  id: string;
  holder: string;
  number: string;
  expiration: string;
  cvv: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  private cardsUrl = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) {}

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
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartItems = []; 
    this.cartSubject.next(this.cartItems); 
  }
  getCartItems(): Product[] {
    return this.cartItems;
  }
  

  validateCard(card: Partial<Card>): Observable<boolean> {
    return this.http.get<Card[]>(this.cardsUrl).pipe(
      map(cards =>
        cards.some(savedCard =>
          savedCard.holder === card.holder &&
          savedCard.number === card.number &&
          savedCard.expiration === card.expiration &&
          savedCard.cvv === card.cvv
        )
      )
    );
  }
}
