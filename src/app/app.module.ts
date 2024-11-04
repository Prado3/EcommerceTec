import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRoutingModule,
    CoreModule,
    HomeModule,
    ProductsModule, 
    CartModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
