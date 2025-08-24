import { Component, effect, inject } from '@angular/core';
import { UiStateService } from '../../services/ui-state/ui-state.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NavLinkComponent } from '../../../shared/components/molecules/nav-link/nav-link.component';
import { FloatingPanelComponent } from '../../../shared/components/atoms/floating-panel/floating-panel.component';
import {MenuItemComponent} from '../../../shared/components/molecules/menu-item/menu-item.component';
import {IconComponent} from '../../../shared/components/atoms/icon/icon.component';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [
    NavLinkComponent,
    FloatingPanelComponent,
    MenuItemComponent,
    IconComponent
  ],
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
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
