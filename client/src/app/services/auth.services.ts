import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private userSubject = new BehaviorSubject<any>(null);
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  
  user$ = this.userSubject.asObservable();
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check authentication status on service initialization
    this.authenticateUser();
  }

  authenticateUser(): void {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.authStatusSubject.next(false);
      this.userSubject.next(null);
      return;
    }

    const headers = new HttpHeaders().set('x-auth-token', token);

    this.http.get(`${this.apiUrl}/auth/user`, { headers })
      .subscribe({
        next: (user) => {
          this.userSubject.next(user);
          this.authStatusSubject.next(true);
        },
        error: (error) => {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
          this.userSubject.next(null);
          this.authStatusSubject.next(false);
        }
      });
  }

  isAuthenticated(): boolean {
    return this.authStatusSubject.value;
  }

  getCurrentUser(): any {
    return this.userSubject.value;
  }
}