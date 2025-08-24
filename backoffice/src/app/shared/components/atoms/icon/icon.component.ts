import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

// Definimos tipos para los Inputs para tener un autocompletado y seguridad de tipos excelentes.
export type AppIconSize = 'sm' | 'md' | 'lg' | 'xl';
export type AppIconColor = 'default' | 'subtle' | 'primary';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgClass, MatIcon],
  template: '<mat-icon [ngClass]="classes">{{ iconName }}</mat-icon>',
  styles: `
    :host {
      // Asegura que el icono se comporte como un elemento en línea pero con tamaño.
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `
})
export class IconComponent {
  /** El nombre del icono de Material a mostrar. */
  @Input({ required: true }) iconName!: string;

  /** El tamaño del icono, mapeado a clases de texto de Tailwind. */
  @Input() size: AppIconSize = 'md';

  /** La paleta de color del icono. */
  @Input() color: AppIconColor = 'default';

  /**
   * Construye un objeto de clases para [ngClass] basado en los Inputs.
   * Esto mantiene el HTML limpio y la lógica de clases en el TS.
   */
  get classes() {
    return {
      // Mapeo de tamaños
      'text-base': this.size === 'sm', // 16px
      'text-lg': this.size === 'md',  // 18px
      'text-xl': this.size === 'lg',  // 20px
      'text-2xl': this.size === 'xl', // 24px

      // Mapeo de colores (con soporte para modo oscuro)
      'text-zinc-700 dark:text-zinc-300': this.color === 'default',
      'text-zinc-500 dark:text-zinc-400': this.color === 'subtle',
      'text-purple-700 dark:text-purple-400': this.color === 'primary',
    };
  }
}
