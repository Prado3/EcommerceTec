// src/app/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para poder usar el pipe 'currency'
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule // Asegúrate de incluir CommonModule aquí
  ],
  exports: [HomeComponent] // Exporta HomeComponent si lo necesitas en otros módulos
})
export class HomeModule { }
