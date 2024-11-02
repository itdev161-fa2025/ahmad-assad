import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router'; // Add this import

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter([]) // Add this provider
  ]
}).catch(err => console.error(err));