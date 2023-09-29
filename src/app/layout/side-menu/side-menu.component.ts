import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-side-menu',
  template: `
    <aside>
      <nav>
        <ul>
          <li><a routerLink="home">Home</a></li>
          <li><a routerLink="date">Date</a></li>
          <li>
            <a routerLink="intersection-observer">Intersection Observer</a>
          </li>
          <li><a routerLink="timer">Timer</a></li>
        </ul>
      </nav>
    </aside>
  `,
  styles: [
    `
      :host aside {
        min-width: 240px;
        padding: 0 24px;
      }
    `,
  ],
  imports: [RouterLink],
})
export class SideMenuComponent {}
