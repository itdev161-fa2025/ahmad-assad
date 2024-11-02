import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Add this import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    NgFor,
    RouterOutlet  // Add this to imports
  ]
})
export class AppComponent {
  title = 'Your App Title';
  posts = [
    { id: 1, title: 'First Post', body: 'This is the first post content' },
    { id: 2, title: 'Second Post', body: 'This is the second post content' }
  ];

  editPost(post: any) {
    console.log('Edit post:', post);
  }

  deletePost(id: number) {
    console.log('Delete post:', id);
  }
}