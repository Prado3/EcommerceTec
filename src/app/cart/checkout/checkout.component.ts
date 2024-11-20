import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  errorMessage = '';
  successMessage = '';
  total: number = 0;
  paymentReceipt: any; 
  isPaymentSuccessful = false;  

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.total = navigation.extras.state['total'];
    }
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],

      
      cardHolder: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],  
      expiration: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],  
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]  
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const formValues = this.checkoutForm.value;

      this.cartService.validateCard({
        holder: formValues.cardHolder,
        number: formValues.cardNumber,
        expiration: formValues.expiration,
        cvv: formValues.cvv
      }).subscribe(
        isValidCard => {
          if (isValidCard) {
            this.successMessage = '¡Pago exitoso! Se le enviará un email con las instrucciones de envío.';
            this.errorMessage = '';

            this.generateReceipt(formValues);
            this.isPaymentSuccessful = true;  
            this.cartService.clearCart();
          } else {
            this.errorMessage = 'Los datos de la tarjeta son incorrectos. Verifícalos e inténtalo nuevamente.';
            this.successMessage = '';
          }
        },
        error => {
          this.errorMessage = 'Error al validar la tarjeta. Intenta nuevamente más tarde.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      this.successMessage = '';
    }
  }

  generateReceipt(formValues: any): void {
    const cartItems = this.cartService.getCartItems(); 
    const receipt = {
      name: formValues.cardHolder,
      shippingAddress: formValues.shippingAddress,
      city: formValues.city,
      postalCode: formValues.postalCode,
      products: cartItems.map(item => ({
        name: item.title,
        quantity: item.quantity
      })),
      total: this.total,
      receiptNumber: Math.floor(Math.random() * 1000000) 
    };
    this.paymentReceipt = receipt;
  }
}
