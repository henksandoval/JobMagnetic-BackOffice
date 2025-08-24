import { Component, effect, inject } from '@angular/core';
import { UiStateService } from '../../services/ui-state/ui-state.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NavLinkComponent } from '../../../shared/components/molecules/nav-link/nav-link.component';
import { FloatingPanelComponent } from '../../../shared/components/atoms/floating-panel/floating-panel.component';
import {MatListItem} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [
    NavLinkComponent,
    FloatingPanelComponent,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    NgIf
  ],
  templateUrl: './sidenav-menu.component.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `
})
export class SidenavMenuComponent {
  navigationService = inject(NavigationService);
  uiStateService = inject(UiStateService);
  collapsed = false;
  floatingMenuX = 0;
  floatingMenuY = 0;
  isFloatingPanelVisible = true;
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
      this.floatingMenuY = rect.top;
      this.floatingMenuX = rect.right;
    }
  }

  showFloatingMenu(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  hideFloatingMenuDelayed(): void {
    this.hideTimeout = window.setTimeout(() => {}, 150);
  }
}
