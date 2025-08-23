import {Component, inject} from '@angular/core';
import {UiStateService} from '@core/services/ui-state-service/ui-state.service';
import {MatIconButton} from '@angular/material/button';
import {SidenavMenuComponent} from '../sidenav-menu/sidenav-menu.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIconButton,
    MatIcon,
    SidenavMenuComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public uiStateService = inject(UiStateService);
}
