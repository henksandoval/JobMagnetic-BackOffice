import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { IconComponent } from '@shared/components/atoms/icon/icon.component';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatDivider, MatButton, IconComponent],
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
  private authService = inject(AuthService);

  get currentUser() {
    return this.authService.currentUser();
  }

  onProfileClick() {
    console.log('Profile clicked');
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
