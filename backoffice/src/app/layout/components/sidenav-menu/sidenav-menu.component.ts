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

    .menu-item-wrapper::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 0;
      bottom: 0;
      width: 12px;
      background: transparent;
      display: none;
    }

    .menu-item-wrapper:hover::after {
      display: block;
    }
  `
})
export class SidenavMenuComponent {
  navigationService = inject(NavigationService);
  uiStateService = inject(UiStateService);
  collapsed = false;

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
}
