// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module'; // Importa HomeModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule // Asegúrate de que HomeModule esté aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
