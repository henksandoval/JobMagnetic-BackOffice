import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import {IconComponent} from '../../atoms/icon/icon.component';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    MatTooltip,
    IconComponent
  ],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {
  // --- Entradas de Datos ---
  @Input() route?: string;
  @Input() label?: string;
  @Input() icon?: string;

  // --- Entradas de Estado y Variante ---
  @Input() isParent = false;
  @Input() isExpanded = false;
  @Input() isCollapsed = false;
  @Input() variant: 'default' | 'child' | 'floating' = 'default';

  // --- Salidas de Eventos ---
  @Output() toggled = new EventEmitter<void>();

  // --- Getters para Lógica de Template ---

  /** Determina si el enlace debe usar routerLink o ser un botón. */
  get isRouterLink(): boolean {
    return !!this.route && !this.isParent;
  }

  /** Determina si el enlace es un botón que dispara un evento de toggle. */
  get isToggleButton(): boolean {
    return this.isParent && !this.isCollapsed;
  }

  /** Determina si es un ancla "muerta" (solo visual, para el modo colapsado). */
  get isPlaceholder(): boolean {
    return this.isParent && this.isCollapsed;
  }

  /** Gestiona las clases del contenedor principal del enlace. */
  get linkClasses() {
    return {
      // Estilos base compartidos por todos
      'nav-link': true,
      'flex items-center no-underline transition-colors duration-200': true,

      // Estilos de variante 'default' (padres y simples)
      'py-4 px-5 mx-3 my-1 rounded-xl': this.variant === 'default',
      'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5': this.variant === 'default',

      // Estilos de variante 'child' (hijos de submenú)
      'py-3 px-4 my-1 rounded-lg': this.variant === 'child',
      'text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5': this.variant === 'child',

      // Estilos de variante 'floating' (dentro del panel flotante)
      'py-3 px-4 my-1 rounded-md': this.variant === 'floating',
      'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-slate-700/70': this.variant === 'floating',

      // Estilos para el estado activo (usando el selector de routerLinkActive)
      '[&.active-link]:font-semibold': true,
      '[&.active-link]:bg-purple-100 dark:[&.active-link]:bg-purple-900/60': true,
      '[&.active-link]:text-purple-700 dark:[&.active-link]:text-purple-300': true,

      // Estilos para el modo colapsado
      'justify-center w-12 h-12 mx-auto my-2 rounded-xl hover:bg-black/10 dark:hover:bg-slate-700': this.isCollapsed,
    };
  }

  /** Gestiona las clases del icono. */
  get iconContainerClasses() {
    return {
      'm-0': this.isCollapsed,
      'mr-4': !this.isCollapsed,
    };
  }
}
