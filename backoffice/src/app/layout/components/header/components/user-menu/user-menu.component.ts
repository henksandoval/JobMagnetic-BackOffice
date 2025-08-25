import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { IconComponent } from '../../../../../shared/components/atoms/icon/icon.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatDivider, MatButton, IconComponent],
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
  private authService = inject(AuthService);

  // Getter para acceder al usuario actual
  get currentUser() {
    return this.authService.currentUser();
  }

  onProfileClick() {
    console.log('Profile clicked');
    // TODO: Implementar navegación al perfil del usuario
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
