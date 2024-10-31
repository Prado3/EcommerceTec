import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module'; // Importa el ProductsModule
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    ProductsModule // Asegúrate de incluir ProductsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
