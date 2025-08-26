import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationService } from '../../services/navigation/navigation.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class BreadcrumbComponent {
  private navigationService = inject(NavigationService);
  // Computed signal para obtener la jerarquía de breadcrumb
  breadcrumbTrail = computed<MenuItem[]>(() => {
    const url = this.currentUrl();
    function findTrail(items: MenuItem[], parentTrail: MenuItem[] = []): MenuItem[] {
      for (const item of items) {
        const newTrail = [...parentTrail, item];
        if (item.route === url) return newTrail;
        if (item.children) {
          const childTrail = findTrail(item.children, newTrail);
          if (childTrail.length) return childTrail;
        }
      }
      return [];
    }
    return findTrail(this.navigationService.menuItems());
  });
  private router = inject(Router);
  // Signal con la ruta actual
  currentUrl = signal(this.router.url);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.currentUrl.set(e.urlAfterRedirects));
  }
}
