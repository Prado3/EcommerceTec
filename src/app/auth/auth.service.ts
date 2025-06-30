import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string | null>(null);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

constructor(
  private http: HttpClient,
  private router: Router
) {}



  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl, {
      params: new HttpParams().set('email', email).set('password', password)
    }).pipe(
      tap(users => {
        if (users.length > 0) {
          const user = users[0];
          this.isLoggedInSubject.next(true);
          this.userNameSubject.next(user.name);
          localStorage.setItem('userEmail', email); 
        } else {
          this.isLoggedInSubject.next(false);
        }
      }),
      map(users => users.length > 0),
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(true);
        } else {
          return throwError(() => new Error('Usuario o contraseña incorrecto'));
        }
      }),
      catchError(() => of(false))
    );
  }

  register(user: { email: string; password: string; name: string; lastName: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl, {
      params: new HttpParams().set('email', user.email)
    }).pipe(
      switchMap(existingUsers => {
        if (existingUsers.length > 0) {
          return throwError(() => new Error('Este email ya está registrado.'));
        } else {
          return this.http.post(this.apiUrl, user);
        }
      }),
      catchError(error => {
        console.error('Error en el registro:', error);
        return throwError(error);
      })
    );
  }

logout(): void {
  this.isLoggedInSubject.next(false);
  this.userNameSubject.next(null);
  localStorage.removeItem('userEmail'); 
  
  this.router.navigate(['']); 
}


  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}