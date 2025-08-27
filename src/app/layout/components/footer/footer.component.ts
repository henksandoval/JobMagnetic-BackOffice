import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer
      class="mt-auto border-t bg-card px-6 py-4 text-sm text-muted-foreground border"
    >
      <div class="flex flex-col items-center justify-between gap-y-2 sm:flex-row">
        <div class="text-center sm:text-left">
          <span>&copy; {{ currentYear }} Admin Panel. All rights reserved.</span>
        </div>
        <div class="flex items-center gap-x-6">
          <a routerLink="/terms" class="transition-colors hover:text-foreground">
            Terms
          </a>
          <a routerLink="/privacy" class="transition-colors hover:text-foreground">
            Privacy
          </a>
          <span class="font-medium text-foreground"> v1.0.0 </span>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  public readonly currentYear = new Date().getFullYear();
}
