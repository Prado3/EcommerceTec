import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any; 

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); 

    if (productId) { 
      this.productsService.getProductById(productId).subscribe(product => {
        this.product = product;
      }, error => {
        console.error('Error al cargar el producto:', error);
      });
    } else {
      console.error('El ID del producto es null');
    }
  }

  addToCart() {
    if (this.product) { 
      this.cartService.addToCart(this.product); 
      alert('Producto agregado al carrito'); 
    }
  }
}
