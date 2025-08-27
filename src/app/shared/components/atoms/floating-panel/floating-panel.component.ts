import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-panel',
  standalone: true,
  imports: [],
  template: `
    <div
      class="floating-panel min-w-[220px] p-2
             bg-card border border rounded-lg shadow-xl"
    >
      @if (title) {
        <header
          class="submenu-header px-4 pt-3 pb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider"
        >
          {{ title }}
        </header>
      }
      <ng-content></ng-content>
    </div>
  `,
})
export class FloatingPanelComponent {
  @Input() title?: string;
}
