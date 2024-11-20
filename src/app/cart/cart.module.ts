import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    CartComponent, 
    CheckoutComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CartComponent }, 
      { path: 'checkout', component: CheckoutComponent }, 
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CartService],
  exports: [CartComponent, CheckoutComponent],
})
export class CartModule {}
