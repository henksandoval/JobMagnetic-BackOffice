import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <footer class="mt-auto border-t bg-white px-6 py-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
      <div class="flex flex-col items-center justify-between gap-y-2 sm:flex-row">
        <div class="text-center sm:text-left">
          <span>&copy; {{ currentYear }} Admin Panel. Todos los derechos reservados.</span>
        </div>
        <div class="flex items-center gap-x-6">
          <a routerLink="/terms" class="transition-colors hover:text-slate-900 dark:hover:text-white">
            Términos
          </a>
          <a routerLink="/privacy" class="transition-colors hover:text-slate-900 dark:hover:text-white">
            Privacidad
          </a>
          <span class="font-medium text-slate-600 dark:text-slate-300">
        v1.0.0
      </span>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  public readonly currentYear = new Date().getFullYear();
}
