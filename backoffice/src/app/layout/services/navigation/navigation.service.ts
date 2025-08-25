import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { AppRoute } from 'src/app/core/models/app-route.model';
import { LayoutComponent } from '@layout/layout.component'; // Ajusta la ruta a tu modelo

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  // La señal ahora se inicializa vacía y se poblará en el constructor
  menuItems: WritableSignal<MenuItem[]> = signal<MenuItem[]>([]);

  constructor(private router: Router) {
    // Obtenemos la configuración de rutas principal (la que tiene LayoutComponent)
    const layoutRoute = this.router.config.find((r) => r.component === LayoutComponent);
    if (layoutRoute && layoutRoute.children) {
      const menu = this.buildMenuFromRoutes(layoutRoute.children as AppRoute[]);
      this.menuItems.set(menu);
    }
  }

  /**
   * Transforma un array de AppRoute a un array de MenuItem, filtrando las
   * rutas que no deben aparecer en el menú.
   * @param routes - Las rutas a procesar.
   * @param parentPath - El path acumulado del padre, para construir rutas completas.
   * @returns Un array de MenuItem.
   */
  private buildMenuFromRoutes(routes: AppRoute[], parentPath: string = ''): MenuItem[] {
    return routes
      .filter((route) => route.data && !route.data.hiddenInMenu) // Solo rutas con 'data' y no ocultas
      .map((route) => {
        // Construimos la ruta completa para el routerLink
        const fullRoute = `${parentPath}/${route.path}`;

        const menuItem: MenuItem = {
          route: fullRoute,
          label: route.data!.label,
          icon: route.data!.icon ?? '',
        };

        // Si la ruta tiene hijos, los procesamos recursivamente
        if (route.children) {
          menuItem.children = this.buildMenuFromRoutes(route.children, fullRoute);
        }

        return menuItem;
      });
  }

  // Las funciones de abajo pueden permanecer casi iguales, ya que operan sobre la señal
  toggleMenuExpansion(route: string): void {
    const items = this.menuItems().map((item) => {
      // La lógica podría necesitar ajustarse si buscas en hijos también
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

  private findMenuItemByRoute(route: string): MenuItem | undefined {
    // Esta función podría necesitar ser recursiva si quieres encontrar hijos
    return this.menuItems().find((item) => item.route === route);
  }
}
