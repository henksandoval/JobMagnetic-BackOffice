import {Component, effect, inject} from '@angular/core';
import {UiStateService} from '@core/services/ui-state-service/ui-state.service';
import {NavigationService} from '@core/services/navigation/navigation.service';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidenav-menu',
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    MatListItem,
    MatIcon,
    MatNavList,
    MatTooltip
  ],
  templateUrl: './sidenav-menu.component.html'
})

export class SidenavMenuComponent {
  navigationService = inject(NavigationService);
  uiStateService = inject(UiStateService);
  collapsed = false;

  floatingMenuTop = 0;
  private hideTimeout?: number;

  constructor() {
    effect(() => {
      this.collapsed = this.uiStateService.sidenavIsCollapsed();
    });
  }

  toggleSubmenu(route: string): void {
    if (!this.collapsed) {
      this.navigationService.toggleMenuExpansion(route);
    }
  }

  updateFloatingMenuPosition(event: MouseEvent): void {
    if (this.collapsed) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.floatingMenuTop = rect.top;

      // Mostrar el menú
      this.showFloatingMenu();
    }
  }

  showFloatingMenu(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  hideFloatingMenuDelayed(): void {
    this.hideTimeout = window.setTimeout(() => {
      // El CSS se encargará de ocultar el menú
    }, 150);
  }
}
