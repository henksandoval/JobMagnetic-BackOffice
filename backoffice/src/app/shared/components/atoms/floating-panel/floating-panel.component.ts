import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common"; // Importa NgIf por si acaso

@Component({
  selector: 'app-floating-panel',
  standalone: true,
  imports: [NgIf],
  template: `
    <!--
      CAMBIOS IMPORTANTES AQUÍ:
      1. Se cambia 'fixed' por 'absolute'.
      2. Se elimina el binding de [style] para top y left.
      3. Se añaden clases de Tailwind para posicionar: 'top-0' y 'left-full'.
         'left-full' es lo mismo que 'left: 100%'.
      4. Se mantiene el 'translate' para el offsetX.
    -->
    <div
      [style.transform]="'translate(' + offsetX + 'px, ' + offsetY + 'px)'"
      class="floating-panel absolute top-0 left-full min-w-[220px] z-[9999] p-2
             bg-white border border-zinc-200 rounded-lg shadow-xl
             dark:bg-slate-800 dark:border-slate-700
             opacity-0 invisible pointer-events-none -translate-x-3
             transition-all duration-250 ease-in-out
             group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-x-0"
    >
      @if (title) {
        <header
          class="submenu-header px-4 pt-3 pb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {{ title }}
        </header>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class FloatingPanelComponent {
  @Input() title?: string;
  // ¡YA NO NECESITAMOS ESTOS INPUTS!
  // @Input() positionX: number = 0;
  // @Input() positionY: number = 0;
  @Input() offsetX: number = 12;
  @Input() offsetY: number = 0;
}
