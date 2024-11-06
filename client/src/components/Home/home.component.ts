import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <ng-container *ngIf="authService.authStatus$ | async; else unauthenticated">
        <h1>Welcome, {{(authService.user$ | async)?.name}}!</h1>
        <p>You are logged in and can access all features.</p>
      </ng-container>
      
      <ng-template #unauthenticated>
        <h1>Welcome to Our Platform</h1>
        <p>Please login or register to access all features.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 2em auto;
      padding: 0 1em;
      text-align: center;
    }
  `]
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}