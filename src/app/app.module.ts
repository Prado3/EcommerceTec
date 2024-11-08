import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module'; // Asegúrate de que está importado
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module'; // Asegúrate de que está importado
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // Otros componentes si es necesario...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    ProductsModule,
    CartModule // Asegúrate de que el CartModule esté incluido aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
