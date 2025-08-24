import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-floating-panel',
  standalone: true,
  imports: [],
  template: `
    <div
      [style.left.px]="positionX"
      [style.top.px]="positionY"
      [style.transform]="'translate(' + offsetX + 'px, ' + offsetY + 'px)'"
      class="floating-panel fixed min-w-[220px] z-[9999] p-2
         bg-white border border-zinc-200 rounded-lg shadow-xl
         dark:bg-slate-800 dark:border-slate-700
         opacity-0 invisible pointer-events-none -translate-x-3
         transition-all duration-250 ease-in-out
         group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-x-0"
    >
      <!-- El título solo se renderiza si se proporciona a través del Input -->
      @if (title) {
        <header
          class="submenu-header px-4 pt-3 pb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {{ title }}
        </header>
      }

      <!-- Aquí es donde se proyectará el contenido del componente padre. -->
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
  /** Título opcional que se muestra en la cabecera del panel. */
  @Input() title?: string;
  @Input() positionX: number = 0;
  @Input() positionY: number = 0;
  @Input() offsetX: number = 12;
  @Input() offsetY: number = 0;
}
