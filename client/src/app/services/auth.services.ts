import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private userSubject = new BehaviorSubject<any>(null);
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  
  user$ = this.userSubject.asObservable();
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  authenticateUser(): Observable<any> {  // Changed return type to Observable<any>
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.clearAuthState();
      return new Observable(subscriber => subscriber.complete());  // Return empty Observable
    }

    const headers = new HttpHeaders().set('x-auth-token', token);

    return this.http.get(`${this.apiUrl}/auth/user`, { headers })
      .pipe(
        tap({
          next: (user) => {
            this.userSubject.next(user);
            this.authStatusSubject.next(true);
          },
          error: (error) => {
            console.error('Authentication error:', error);
            this.clearAuthState();
          }
        })
      );
  }

  private clearAuthState(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.authStatusSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.authStatusSubject.value;
  }

  getCurrentUser(): any {
    return this.userSubject.value;
  }
}