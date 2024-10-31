// src/app/products/products.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule
  ],
  exports: [ // Exporta los componentes para que sean accesibles desde otros módulos
    ProductListComponent,
    ProductDetailComponent
  ]
})
export class ProductsModule { }
