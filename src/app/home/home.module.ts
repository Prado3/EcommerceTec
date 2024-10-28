// src/app/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],  // Declara HomeComponent
  exports: [HomeComponent],       // Exporta HomeComponent para otros módulos
  imports: [CommonModule]
})
export class HomeModule {}
