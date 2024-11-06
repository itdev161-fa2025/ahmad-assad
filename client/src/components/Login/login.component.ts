import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="email" name="email" type="email" required>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput [(ngModel)]="password" name="password" type="password" required>
          </mat-form-field>

          <div *ngIf="errors.length > 0" class="error-messages">
            <p *ngFor="let error of errors" class="error-message">
              {{ error.msg }}
            </p>
          </div>

          <button mat-raised-button color="primary" type="submit">Login</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 400px;
      margin: 2em auto;
      text-align: center;
    }
    mat-form-field {
      display: block;
      margin: 1em 0;
    }
    .error-messages {
      color: red;
      margin: 1em 0;
    }
    .error-message {
      margin: 0.5em 0;
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errors: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string; }) => {
        localStorage.setItem('token', response.token);
        this.authService.authenticateUser();
        this.router.navigate(['/dashboard']);
      },
      error: (error: { error: { errors: { msg: string; }[]; }; }) => {
        this.errors = error.error.errors || [{ msg: 'Login failed' }];
      }
    });
  }
}