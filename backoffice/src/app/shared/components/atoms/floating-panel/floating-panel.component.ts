import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-floating-panel',
  standalone: true,
  imports: [],
  template: `
    <div
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
      // El host en sí no necesita ser visible, ya que el panel flotante se posiciona de forma fija.
      // Pero lo definimos como 'contents' para que no interfiera en el layout.
      display: contents;
    }

    // Apuntamos directamente a la clase dentro de nuestro componente para aplicar los estilos.
    // Esto es importante porque el :host no tiene las clases 'group-hover'.
    .floating-panel {
      // Si necesitas añadir algún estilo CSS que no sea de Tailwind, puedes hacerlo aquí.
      // Por ejemplo, si quieres asegurarte de que el panel siempre tenga un \`left\` inicial.
      left: 4.5rem; // (16px * 4) + (16px * 0.5) = 72px, que es el ancho del sidebar colapsado.
    }
  `
})
export class FloatingPanelComponent {
  /** Título opcional que se muestra en la cabecera del panel. */
  @Input() title?: string;
}
