import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HomeComponent } from './home.component';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ProductsModule,
    CartModule
  ],
  exports: [HomeComponent] 
})
export class HomeModule { }
