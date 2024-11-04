import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module'; // Importa el ProductsModule
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module'; // Asegúrate de importar el CartModule
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, // Elimina la coma extra aquí
    // Otros componentes si es necesario...
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Asegúrate de incluir este módulo si usas HttpClient
    AppRoutingModule,
    CoreModule,
    HomeModule,
    ProductsModule, // Asegúrate de incluir ProductsModule aquí
    CartModule // Incluye CartModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
