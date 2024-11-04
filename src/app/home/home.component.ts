import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service'; // Import your service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];

  constructor(private router: Router, private productService: ProductsService) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  getFeaturedProducts(): void {
    // Fetch a limited number of products, e.g., the first 3
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 3); // Adjust the number as needed
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToSomeRoute(id: string) {
    this.router.navigate(['/products', id]);
  }

}
