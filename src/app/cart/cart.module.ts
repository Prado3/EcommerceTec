import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule // Asegúrate de que RouterModule esté aquí si necesitas rutas
  ],
  exports: [CartComponent]
})
export class CartModule { }
