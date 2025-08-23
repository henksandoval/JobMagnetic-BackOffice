import {Component, effect, inject} from '@angular/core';
import {AuthService} from '@core/services/auth/auth.service';
import {UiStateService} from '@core/services/ui-state-service/ui-state.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';
import {RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MatMenu,
    MatDivider,
    MatIcon,
    MatMenuItem,
    MatButton,
    MatIconButton,
    MatMenuTrigger
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  public uiStateService = inject(UiStateService);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      const isDark = this.uiStateService.currentTheme() === 'dark';
      document.body.classList.toggle('dark', isDark);
    });
  }

  onProfileClick() {
    console.log('Profile clicked');
    // TODO: Implementar navegación al perfil del usuario
  }

  onLogoutClick() {
    this.authService.logout();
  }

  // Getter para acceder al usuario actual
  get currentUser() {
    return this.authService.currentUser();
  }
}
