import { Component, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { UiStateService } from '@layout/services/ui-state/ui-state.service';
import { IconComponent } from '@shared/components/atoms/icon/icon.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconButton, IconComponent],
  template: `
    <button
      mat-icon-button
      [attr.aria-label]="'Cambiar a tema ' + (isDark() ? 'claro' : 'oscuro')"
      (click)="toggleTheme()"
    >
      <app-icon [iconName]="isDark() ? 'light_mode' : 'dark_mode'"></app-icon>
    </button>
  `,
})
export class ThemeToggleComponent {
  private uiStateService = inject(UiStateService);
  isDark = this.uiStateService.currentTheme;
  private document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this.document.documentElement.classList.toggle('dark', this.isDark() === 'dark');
    });
  }

  toggleTheme() {
    this.uiStateService.toggleTheme();
  }
}
