import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module'; 
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module'; 
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseHistoryComponent
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