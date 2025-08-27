import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

export type AppIconSize = 'sm' | 'md' | 'lg' | 'xl';
export type AppIconColor = 'default' | 'subtle' | 'primary';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgClass, MatIcon],
  template: '<mat-icon [ngClass]="classes">{{ iconName }}</mat-icon>',
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `,
})
export class IconComponent {
  @Input({ required: true }) iconName!: string;
  @Input() size: AppIconSize = 'md';
  @Input() color: AppIconColor = 'default';
  get classes() {
    return {
      'text-base': this.size === 'sm',
      'text-lg': this.size === 'md',
      'text-xl': this.size === 'lg',
      'text-2xl': this.size === 'xl',

      'text-foreground': this.color === 'default',
      'text-muted-foreground': this.color === 'subtle',
      'text-primary': this.color === 'primary',
    };
  }
}
