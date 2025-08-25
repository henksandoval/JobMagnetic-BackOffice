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
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Showcase de Componentes
        </h1>
        <p class="mt-2 text-base text-gray-600 dark:text-gray-400">
          Este es un layout anidado. El contenido específico de la sub-ruta (ej. el formulario) se renderiza a
          continuación.
        </p>
      </header>
      <main>
        <!-- Aquí se renderiza ShowcaseIndexComponent o FormComponent -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class ShowcaseComponent {}
