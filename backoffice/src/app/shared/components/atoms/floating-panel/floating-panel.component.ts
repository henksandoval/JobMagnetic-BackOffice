import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-panel',
  standalone: true,
  imports: [],
  template: `
    <div
      class="floating-panel min-w-[220px] p-2
             bg-white border border-zinc-200 rounded-lg shadow-xl
             dark:bg-slate-800 dark:border-slate-700"
    >
      @if (title) {
        <header
          class="submenu-header px-4 pt-3 pb-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
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
