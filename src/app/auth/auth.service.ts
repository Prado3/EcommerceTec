import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Cambia esto por la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método login que verifica si el usuario existe
  login(email: string, password: string): Observable<boolean> {
    // Verifica si el usuario existe usando HttpParams
    return this.http.get<any[]>(this.apiUrl, {
      params: new HttpParams().set('email', email).set('password', password)
    }).pipe(
      map(users => users.length > 0), // Si el array tiene algún elemento, el usuario existe
      catchError(() => of(false)) // En caso de error, devuelve 'false'
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
}
