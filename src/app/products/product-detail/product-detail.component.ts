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
  product: any; // Suponiendo que aquí tienes tu producto

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Obtener el ID del parámetro

    // Comprobar que productId no es null y manejarlo adecuadamente
    if (productId) { // Comprobar que productId no es null
      this.productsService.getProductById(productId).subscribe(product => {
        this.product = product; // Asignar el producto obtenido
      }, error => {
        console.error('Error al cargar el producto:', error);
      });
    } else {
      console.error('El ID del producto es null');
    }
  }

  addToCart() {
    if (this.product) { // Asegurarse de que this.product no sea null
      this.cartService.addToCart(this.product); // Agregar el producto al carrito
      alert('Producto agregado al carrito'); // Mensaje de éxito
    }
  }
}
