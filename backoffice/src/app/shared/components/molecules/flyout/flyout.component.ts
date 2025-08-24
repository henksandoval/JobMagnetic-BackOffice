import { Component, HostListener } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

const flyoutAnimation = trigger('flyoutAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-10px)'
    }),
    animate('200ms ease-out', style({
      opacity: 1,
      transform: 'translateX(0)'
    }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({
      opacity: 0,
      transform: 'translateX(-10px)'
    }))
  ])
]);

@Component({
  selector: 'app-flyout',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="[flyout-trigger]"></ng-content>

    @if (isOpen) {
      <div
        [@flyoutAnimation]
        class="flyout-content absolute left-full top-0 ml-2 z-50"
      >
        <ng-content select="[flyout-content]"></ng-content>
      </div>
    }
  `,
  styles: [`
    :host {
      position: relative;
      display: block;
    }
  `],
  animations: [
    flyoutAnimation
  ]
})
export class FlyoutComponent {
  isOpen = false;
  private closeTimeout?: number;

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.closeTimeout = window.setTimeout(() => {
      this.isOpen = false;
    }, 150);
  }
}
