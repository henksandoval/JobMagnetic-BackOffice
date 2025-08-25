import { Component, EventEmitter, Output, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { IconComponent } from '@shared/components/atoms/icon/icon.component';
import { menuItemVariants } from './menu-item.variants';
import { MenuItemConfig } from '@layout/models/menu-item-config.model';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, NgClass, RouterLinkActive, IconComponent],
  template: `
    <a
      [routerLink]="config().route"
      [ngClass]="classes()"
      routerLinkActive="active"
      (click)="itemClick.emit()"
    >
      @if (config().icon) {
        <app-icon
          [ngClass]="{ 'mr-4': config().variant !== 'icon-only' }"
          [iconName]="config().icon!"
          size="lg"
          color="subtle"
        ></app-icon>
      }
      @if (config().variant !== 'icon-only' && config().label) {
        <span class="flex-1 text-sm font-medium">{{ config().label }}</span>
      }
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .active {
        @apply font-semibold bg-purple-100 text-purple-700;
        @apply dark:bg-purple-900/60 dark:text-purple-300;
      }
    `,
  ],
})
export class MenuItemComponent {
  config = input.required<MenuItemConfig>();
  @Output() itemClick = new EventEmitter<void>();

  classes = computed(() => {
    const { variant } = this.config();
    return menuItemVariants({ variant });
  });
}
