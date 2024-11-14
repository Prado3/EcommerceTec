import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  shippingAddress = '';
  city = '';
  postalCode = '';
  cardHolder = '';
  cardNumber = '';
  expiration = '';
  cvv = '';
  errorMessage = '';
  successMessage = ''; 
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.total = navigation.extras.state['total'];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    this.cartService.validateCard({
      holder: this.cardHolder,
      number: this.cardNumber,
      expiration: this.expiration,
      cvv: this.cvv
    }).subscribe(
      isValidCard => {
        if (isValidCard) {
          
          this.successMessage = '¡Pago exitoso! Se le enviará un email con las instrucciones de envío.';
          this.errorMessage = ''; 
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
  }
}
