import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Cambia esto por la URL de tu backend

  // Subjects para manejar el estado de autenticación y el nombre del usuario
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string | null>(null);

  // Observables públicos
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl, {
      params: new HttpParams().set('email', email).set('password', password)
    }).pipe(
      tap(users => {
        if (users.length > 0) { // Si se encuentra al usuario
          const user = users[0];
          this.isLoggedInSubject.next(true);
          this.userNameSubject.next(user.name);
        } else {
          this.isLoggedInSubject.next(false);
        }
      }),
      map(users => users.length > 0), // Si el array tiene algún elemento, el usuario existe
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(true);
        } else {
          return throwError(() => new Error('Usuario o contraseña incorrecto'));
        }
      }),
      catchError(() => of(false)) // En caso de error en la comunicación, devuelve 'false'
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
  }
}
