import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="w-full">
      <header class="mb-6 pb-4 border-b" style="border-color: hsl(var(--border))">
        <h1
          class="text-2xl md:text-3xl font-bold"
          style="color: hsl(var(--primary))"
          i18n="Title for the index showcase@@showcase.index.title"
        >
          Component Showcase
        </h1>
        <p
          class="mt-2 text-base"
          style="color: hsl(var(--foreground))"
          i18n="Description for the index showcase@@showcase.index.description"
        >
          This is a nested layout. The specific content of the sub-route (e.g. the form) is rendered below.
        </p>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class ShowcaseComponent {}
