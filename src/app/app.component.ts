import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import {SideMenuComponent} from "./layout/side-menu/side-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-nav></app-nav>
    <div class="flex">
      <app-side-menu></app-side-menu>
      <main class="container">
        <router-outlet></router-outlet>
      </main>
    </div>
    <app-footer></app-footer>
  `,
  imports: [RouterOutlet, NavComponent, FooterComponent, SideMenuComponent],
})
export class AppComponent {}
