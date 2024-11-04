import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service'; 

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
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 3); 
    });
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToSomeRoute(id: string) {
    this.router.navigate(['/products', id]);
  }
 

}
