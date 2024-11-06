import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>{{title}}</span>
      <span class="spacer"></span>
      <ng-container *ngIf="!(authService.authStatus$ | async)">
        <button mat-button routerLink="/register">Register</button>
        <button mat-button routerLink="/login">Login</button>
      </ng-container>
      <ng-container *ngIf="authService.authStatus$ | async">
        <span>Welcome, {{(authService.user$ | async)?.name}}</span>
        <button mat-button (click)="logout()">Logout</button>
      </ng-container>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Blog Platform';

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.authenticateUser(); 
  }
}