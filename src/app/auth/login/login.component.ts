import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;
  message: string = ''; 
  messageColor: string = ''; 

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
            this.message = 'Sesion iniciada correctamente!';
          this.messageColor = 'green'; 
          setTimeout(() => {
            this.message = ''; 
            this.router.navigate(['/home']); 
          }, 2000);
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
