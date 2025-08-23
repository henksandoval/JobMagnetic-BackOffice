import {Injectable, signal} from '@angular/core';
import {MenuItem} from '@core/services/navigation/interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  menuItems = signal<MenuItem[]>([
    {
      route: '/dashboard',
      label: $localize`:@@navigation.dashboard:Dashboard`,
      icon: 'dashboard'
    },
    {
      route: '/users',
      label: $localize`:@@navigation.users:Usuarios`,
      icon: 'people',
      children: [
        {
          route: '/users/list',
          label: $localize`:@@navigation.users.list:Lista de Usuarios`,
          icon: 'list'
        },
        {
          route: '/users/create',
          label: $localize`:@@navigation.users.create:Crear Usuario`,
          icon: 'person_add'
        },
        {
          route: '/users/roles',
          label: $localize`:@@navigation.users.roles:Roles y Permisos`,
          icon: 'admin_panel_settings'
        }
      ]
    },
    {
      route: '/products',
      label: $localize`:@@navigation.products:Productos`,
      icon: 'inventory',
      children: [
        {
          route: '/products/catalog',
          label: $localize`:@@navigation.products.catalog:Catálogo`,
          icon: 'category'
        },
        {
          route: '/products/inventory',
          label: $localize`:@@navigation.products.inventory:Inventario`,
          icon: 'warehouse'
        },
        {
          route: '/products/suppliers',
          label: $localize`:@@navigation.products.suppliers:Proveedores`,
          icon: 'local_shipping'
        }
      ]
    },
    {
      route: '/sales',
      label: $localize`:@@navigation.sales:Ventas`,
      icon: 'shopping_cart',
      children: [
        {
          route: '/sales/orders',
          label: $localize`:@@navigation.sales.orders:Órdenes`,
          icon: 'receipt'
        },
        {
          route: '/sales/customers',
          label: $localize`:@@navigation.sales.customers:Clientes`,
          icon: 'group'
        },
        {
          route: '/sales/invoices',
          label: $localize`:@@navigation.sales.invoices:Facturas`,
          icon: 'description'
        }
      ]
    },
    {
      route: '/analytics',
      label: $localize`:@@navigation.analytics:Analytics`,
      icon: 'analytics',
      children: [
        {
          route: '/analytics/reports',
          label: $localize`:@@navigation.analytics.reports:Reportes`,
          icon: 'assessment'
        },
        {
          route: '/analytics/charts',
          label: $localize`:@@navigation.analytics.charts:Gráficos`,
          icon: 'bar_chart'
        },
        {
          route: '/analytics/kpis',
          label: $localize`:@@navigation.analytics.kpis:KPIs`,
          icon: 'trending_up'
        }
      ]
    },
    {
      route: '/finance',
      label: $localize`:@@navigation.finance:Finanzas`,
      icon: 'account_balance',
      children: [
        {
          route: '/finance/accounting',
          label: $localize`:@@navigation.finance.accounting:Contabilidad`,
          icon: 'calculate'
        },
        {
          route: '/finance/budgets',
          label: $localize`:@@navigation.finance.budgets:Presupuestos`,
          icon: 'savings'
        },
        {
          route: '/finance/expenses',
          label: $localize`:@@navigation.finance.expenses:Gastos`,
          icon: 'credit_card'
        }
      ]
    },
    {
      route: '/support',
      label: $localize`:@@navigation.support:Soporte`,
      icon: 'support_agent',
      children: [
        {
          route: '/support/tickets',
          label: $localize`:@@navigation.support.tickets:Tickets`,
          icon: 'confirmation_number'
        },
        {
          route: '/support/chat',
          label: $localize`:@@navigation.support.chat:Chat en Vivo`,
          icon: 'chat'
        },
        {
          route: '/support/knowledge',
          label: $localize`:@@navigation.support.knowledge:Base de Conocimientos`,
          icon: 'help'
        }
      ]
    },
    {
      route: '/settings',
      label: $localize`:@@navigation.settings:Configuración`,
      icon: 'settings',
      children: [
        {
          route: '/settings/general',
          label: $localize`:@@navigation.settings.general:General`,
          icon: 'tune'
        },
        {
          route: '/settings/security',
          label: $localize`:@@navigation.settings.security:Seguridad`,
          icon: 'security'
        },
        {
          route: '/settings/notifications',
          label: $localize`:@@navigation.settings.notifications:Notificaciones`,
          icon: 'notifications'
        },
        {
          route: '/settings/integrations',
          label: $localize`:@@navigation.settings.integrations:Integraciones`,
          icon: 'extension'
        }
      ]
    }
  ]);

  toggleMenuExpansion(route: string): void {
    const items = this.menuItems().map(item => {
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
    return this.menuItems().find(item => item.route === route);
  }
}
