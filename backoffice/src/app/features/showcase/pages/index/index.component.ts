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
          <h3 class="ml-4 text-lg font-semibold text-gray-800 dark:text-gray-100" i18n="Title for the forms showcase card@@showcase.forms.title">Forms</h3>
        </div>
        <p class="mt-3 text-sm text-gray-600 dark:text-gray-400" i18n="Description for the forms showcase card@@showcase.forms.description">
          Example of a reactive form built with Angular Material and styled with Tailwind CSS.
        </p>
      </a>
      <div class="block p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-md cursor-not-allowed">
        <div class="flex items-center">
          <mat-icon class="text-gray-400 !h-8 !w-8 text-4xl">table_chart</mat-icon>
          <h3 class="ml-4 text-lg font-semibold text-gray-500 dark:text-gray-400" i18n="Title for the tables showcase card@@showcase.tables.title">
            Tables (Coming Soon)
          </h3>
        </div>
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-500" i18n="Description for the tables showcase card@@showcase.tables.description">
          Example of a data table with pagination and filters.
        </p>
      </div>
    </div>
  `,
})
export class ShowcaseIndexComponent {}
