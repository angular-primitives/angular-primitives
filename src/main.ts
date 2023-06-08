import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { IntersectionObserverComponent } from './app/pages/intersection-observer/intersection-observer.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        loadComponent: () => HomeComponent,
      },
      {
        path: 'intersection-observer',
        loadComponent: () => IntersectionObserverComponent,
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
}).catch((err) => console.error(err));
