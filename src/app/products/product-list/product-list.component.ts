import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all'; 
  successMessage: string = '';
  searchTerm: string = '';


  constructor(private productsService: ProductsService, private cartService: CartService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.productsService.getProducts().subscribe(
    (data) => {
      this.products = data;
      this.categories = [...new Set(data.map(product => product.category))];

      this.route.queryParams.subscribe(params => {
  this.searchTerm = params['search']?.toLowerCase() || '';
  this.filteredProducts = this.searchTerm
    ? this.products.filter(p =>
        p.title.toLowerCase().includes(this.searchTerm) || 
        p.description.toLowerCase().includes(this.searchTerm)
      )
    : this.products;
});
    },
    (error) => console.error('Error al cargar los productos:', error)
  );
}

  filterByCategory(category: string): void {
    this.selectedCategory = category; 
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
