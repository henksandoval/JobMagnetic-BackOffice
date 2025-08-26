// showcase.component.ts (Está correcto, no requiere cambios)

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="w-full">
      <header class="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Component Showcase</h1>
        <p class="mt-2 text-base text-gray-600 dark:text-gray-400">
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
