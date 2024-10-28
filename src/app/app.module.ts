import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Asegúrate de importar esto
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component'; // Asegúrate de que esta ruta sea correcta
//import { ProductListComponent } from './products/product-list/product-list.component';
import { CartService } from './cart/cart.service';
//import { ProductsService } from './products/products.service';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
   // ProductListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule // Agrega esto aquí
  ],
  //providers: [CartService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
