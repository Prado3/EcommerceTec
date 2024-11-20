import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  registrationError: string | null = null;
  message: string = ''; 
  messageColor: string = ''; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{1,8}$')]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.message = 'Usuario registrado con exito!';
          this.messageColor = 'green'; 
          setTimeout(() => {
            this.message = ''; 
            this.router.navigate(['/login']); 
          }, 2000);
        },
        error: err => {
          this.registrationError = err.message;
          console.error('Error al registrarse:', err);
        }
      });
    }
  }
}