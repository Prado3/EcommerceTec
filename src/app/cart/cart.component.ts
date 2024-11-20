import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.updateTotal();
    });
  }

  increaseQuantity(product: Product) {
    this.cartService.addToCart(product);
    this.updateTotal();
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      this.cartService.updateQuantity(product, product.quantity - 1);
    } else {
      this.removeItem(product);
    }
    this.updateTotal();
  }

  removeItem(product: Product) {
    this.cartService.removeFromCart(product);
    this.updateTotal();
  }

  private updateTotal() {
    this.total = this.cartService.getTotal();
  }

  saveCart() {
    this.cartService.saveCart().subscribe(
      (response) => {
        this.successMessage = 'Carrito guardado exitosamente!';
        this.errorMessage = '';
        console.log('Carrito guardado en el servidor:', response);
      },
      (error) => {
        this.errorMessage = 'Error al guardar el carrito. Inténtalo de nuevo.';
        this.successMessage = '';
        console.error('Error al guardar el carrito:', error);
      }
    );
  }
  clearCart() {
    this.cartService.clearCart();
    this.successMessage = 'Carrito vaciado exitosamente!';
    this.errorMessage = '';
  }
  

  proceedToCheckout() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout'], {
        state: { total: this.total }
      });
    } else {
      this.errorMessage = 'Tu carrito está vacío. Agrega productos antes de proceder.';
    }
  }
}
