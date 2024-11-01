import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Array para almacenar los productos
  successMessage: string = ''; // Mensaje de éxito

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data; // Asigna los productos obtenidos al array
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product); // Agrega el producto al carrito
    this.successMessage = 'Producto agregado al carrito exitosamente!'; // Actualiza el mensaje de éxito

    // Opcional: Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
