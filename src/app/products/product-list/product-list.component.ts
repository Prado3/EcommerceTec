import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  successMessage: string = '';

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data; 
        this.categories = [...new Set(data.map(product => product.category))]; 
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  filterByCategory(category: string): void {
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }


  sortByPrice(order: string): void {
    if (order === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }


  sortByPriceEvent(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortByPrice(selectElement.value);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product); 
    this.successMessage = 'Producto agregado al carrito exitosamente!'; 

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
