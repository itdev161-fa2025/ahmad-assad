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

  // Add this login method that returns an Observable
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  authenticateUser(): void {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.clearAuthState();
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
          this.clearAuthState();
        }
      });
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