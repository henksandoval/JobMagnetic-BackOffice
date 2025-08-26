import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { AppRoute } from 'src/app/core/models/app-route.model';
import { LayoutComponent } from '@layout/layout.component'; // Adjust the path to your model

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  menuItems: WritableSignal<MenuItem[]> = signal<MenuItem[]>([]);

  constructor(private router: Router) {
    const layoutRoute = this.router.config.find((r) => r.component === LayoutComponent);
    if (layoutRoute && layoutRoute.children) {
      const menu = this.buildMenuFromRoutes(layoutRoute.children as AppRoute[]);
      this.menuItems.set(menu);
    }
  }

  toggleMenuExpansion(route: string): void {
    const items = this.menuItems().map((item) => {
      if (item.route === route && item.children) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    this.menuItems.set(items);
  }

  isMenuExpanded(route: string): boolean {
    const item = this.findMenuItemByRoute(route);
    return item?.expanded || false;
  }

  private buildMenuFromRoutes(routes: AppRoute[], parentPath: string = ''): MenuItem[] {
    return routes
      .filter((route) => route.data && !route.data.hiddenInMenu)
      .map((route) => {
        const fullRoute = `${parentPath}/${route.path}`;

        const menuItem: MenuItem = {
          route: fullRoute,
          label: route.data!.label,
          icon: route.data!.icon ?? '',
        };

        if (route.children) {
          menuItem.children = this.buildMenuFromRoutes(route.children, fullRoute);
        }

        return menuItem;
      });
  }

  private findMenuItemByRoute(route: string): MenuItem | undefined {
    return this.menuItems().find((item) => item.route === route);
  }
}
