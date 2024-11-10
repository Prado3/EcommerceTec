import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (isLoggedIn) => {
          if (isLoggedIn) {
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/home']);
          } else {
            this.loginError = 'Usuario o contraseña incorrecto';
          }
        },
        error: (err) => {
          this.loginError = 'Error al iniciar sesión';
          console.error('Error en el inicio de sesión:', err);
        }
      });
    }
  }
}
