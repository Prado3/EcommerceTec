import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module'; // Asegúrate de que está importado
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module'; // Asegúrate de que está importado
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
    // otros componentes
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    RouterModule,
    CoreModule,
    HomeModule,
    ProductsModule, 
    CartModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {}
