import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { UiStateService } from '../../services/ui-state/ui-state.service';
import { IconComponent } from '../../../shared/components/atoms/icon/icon.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconButton, ThemeToggleComponent, UserMenuComponent, IconComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // Solo necesita el servicio para el botón del menú. El resto está encapsulado.
  public uiStateService = inject(UiStateService);
}
