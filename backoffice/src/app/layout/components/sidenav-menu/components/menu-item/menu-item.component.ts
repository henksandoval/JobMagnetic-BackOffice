import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { IconComponent } from '@shared/components/atoms/icon/icon.component';

@Component({
  selector: 'app-menu-item',
  imports: [RouterLink, NgClass, RouterLinkActive, IconComponent],
  template: `
    <a [routerLink]="route" [ngClass]="classes" routerLinkActive="active" (click)="itemClick.emit()">
      @if (icon) {
        <app-icon
          [ngClass]="{ 'mr-4': variant !== 'icon-only' }"
          [iconName]="icon"
          size="lg"
          color="subtle"
        ></app-icon>
      }
      @if (variant !== 'icon-only' && label) {
        <span class="flex-1 text-sm font-medium">{{ label }}</span>
      }
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class MenuItemComponent {
  @Input() route?: string;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() variant: 'default' | 'child' | 'floating' | 'icon-only' = 'default';
  @Output() itemClick = new EventEmitter<void>();

  get classes() {
    const base = 'flex items-center w-full no-underline transition-colors duration-200';
    const active =
      '[&.active]:font-semibold [&.active]:bg-purple-100 dark:[&.active]:bg-purple-900/60 [&.active]:text-purple-700 dark:[&.active]:text-purple-300';

    const variants = {
      default:
        'py-3 px-4 mx-3 my-1 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5',
      child:
        'py-3 pl-6 pr-4 my-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5',
      floating:
        'py-2 px-4 my-1 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-slate-700/70',
      'icon-only':
        'justify-center w-12 h-12 mx-auto my-2 rounded-xl hover:bg-black/10 dark:hover:bg-slate-700',
    };

    return `${base} ${active} ${variants[this.variant]}`;
  }
}
