// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Importa HttpClientModule

import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module'; // Importa el ProductsModule
import { HomeModule } from './home/home.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    // otros componentes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    HomeModule,
    ProductsModule // Asegúrate de incluir ProductsModule aquí,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {}
