import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-showcase-index',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatIconModule],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        [routerLink]="['form']"
        class="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div class="flex items-center">
          <mat-icon class="text-blue-500 !h-8 !w-8 text-4xl">edit_note</mat-icon>
          <h3 class="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-100">Formularios</h3>
        </div>
        <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Ejemplo de un formulario reactivo construido con Angular Material y estilizado con Tailwind CSS.
        </p>
      </a>
      <div class="block p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-not-allowed">
        <div class="flex items-center">
          <mat-icon class="text-gray-400 !h-8 !w-8 text-4xl">table_chart</mat-icon>
          <h3 class="ml-4 text-lg font-semibold text-gray-500 dark:text-gray-400">Tablas (Próximamente)</h3>
        </div>
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-500">
          Ejemplo de una tabla de datos con paginación y filtros.
        </p>
      </div>
    </div>
  `,
})
export class ShowcaseIndexComponent {}
