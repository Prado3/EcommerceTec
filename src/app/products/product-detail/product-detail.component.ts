import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any; 
  isLoggedIn = false;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); 

    if (productId) { 
      this.productsService.getProductById(productId).subscribe(product => {
        this.product = product; 
      }, error => {
        console.error('Error al cargar el producto:', error);
      });
    }

    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
  }

  addToCart() {
    if (!this.isLoggedIn) {
      alert('Debes iniciar sesión o registrarte para agregar productos al carrito.');
    } else if (this.product) {
      this.cartService.addToCart(this.product); 
      alert('Producto agregado al carrito'); 
    }
  }
}
