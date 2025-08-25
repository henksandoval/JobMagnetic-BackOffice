import { Component, inject } from '@angular/core';
import { UiStateService } from '../../services/ui-state/ui-state.service';
import { MatIconButton } from '@angular/material/button';
import { SidenavMenuComponent } from '@layout/components/sidebar/components/sidenav-menu/sidenav-menu.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconButton, MatIcon, SidenavMenuComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public uiStateService = inject(UiStateService);
}
