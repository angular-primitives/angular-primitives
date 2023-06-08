import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-nav',
    standalone: true,
    template: `
      <nav class="container-fluid">
        <ul>
          <li>
            <a href="" class="contrast" onclick="event.preventDefault()">
              <strong>Angular Primitives Demos</strong>
            </a>
          </li>
        </ul>
      </nav>
    `,
    imports: [RouterLink, NgIf],
    styles: [
        `
            :host {
                display: block;
                padding: 0.5rem 1.5rem 2rem 1.5rem;
            }
        `,
    ],
})
export class NavComponent {
}
