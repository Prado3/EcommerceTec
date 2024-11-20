import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false; 
  userName: string | null = null; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);

    this.authService.userName$.subscribe(name => this.userName = name);
  }

  goToLogin(): void {
    this.router.navigate(['/login']); 
  }

  goToRegister(): void {
    this.router.navigate(['/register']); 
  }

  logout(): void {
    this.authService.logout(); 
  }
}
