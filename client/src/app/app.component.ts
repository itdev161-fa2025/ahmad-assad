import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, DatePipe } from '@angular/common';  // Add DatePipe
import { RouterOutlet } from '@angular/router';

interface Post {
  id: number;
  title: string;
  body: string;
  createdDate: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgFor,
    RouterOutlet,
    DatePipe     // Add DatePipe to imports
  ]
})
export class AppComponent {
  title = 'Your App Title';
  
  posts: Post[] = [
    { 
      id: 1, 
      title: 'First Post', 
      body: 'This is the first post content',
      createdDate: new Date()
    },
    { 
      id: 2, 
      title: 'Second Post', 
      body: 'This is the second post content',
      createdDate: new Date()
    }
  ];

  editPost(post: Post) {
    console.log('Edit post:', post);
  }

  deletePost(id: number) {
    console.log('Delete post:', id);
  }
}