import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-flyout',
  standalone: true,
  imports: [NgIf],
  // Usamos una plantilla en línea porque es muy pequeña y está muy ligada a la lógica.
  template: `
    <!--
      Esta es la "ranura" para el elemento que el usuario ve y sobre el que pasa el ratón.
      Le asignamos el selector [flyout-trigger].
    -->
    <ng-content select="[flyout-trigger]"></ng-content>

    <!--
      Esta es la "ranura" para el contenido que aparece/desaparece.
      Solo se renderiza en el DOM si 'isOpen' es verdadero.
      Está posicionado de forma absoluta relativo al host del flyout.
    -->
    @if (isOpen) {
      <div class="flyout-content absolute left-full top-0 ml-2 z-50">
        <ng-content select="[flyout-content]"></ng-content>
      </div>
    }
  `,
  // Los estilos del host aseguran que el posicionamiento absoluto funcione correctamente.
  styles: [`
    :host {
      position: relative;
      display: block;
    }
  `]
})
export class FlyoutComponent {
  isOpen = false;
  private closeTimeout?: number; // Usaremos un tipo compatible con Node y el navegador

  // Este decorador escucha el evento 'mouseenter' en el elemento host <app-flyout>.
  @HostListener('mouseenter')
  onMouseEnter() {
    // Si existía un temporizador para cerrar el panel, lo cancelamos.
    // Esto sucede si el usuario sale y vuelve a entrar rápidamente.
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    // Abrimos el panel.
    this.isOpen = true;
  }

  // Este decorador escucha el evento 'mouseleave' en el elemento host <app-flyout>.
  @HostListener('mouseleave')
  onMouseLeave() {
    // No cerramos el panel inmediatamente. Iniciamos un temporizador.
    // Este retardo de 150ms es la solución al "abismo". Le da al usuario
    // tiempo suficiente para mover el cursor desde el icono hasta el panel flotante.
    this.closeTimeout = window.setTimeout(() => {
      this.isOpen = false;
    }, 150);
  }
}
