import { Component, computed, EventEmitter, input, Output } from '@angular/core';
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
        @apply font-semibold bg-primary/10 text-primary;
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
