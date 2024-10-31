// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
featuredProducts: any;
constructor(private router: Router) {}

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
