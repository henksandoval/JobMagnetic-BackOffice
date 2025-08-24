import { Component, ContentChild, ElementRef, OnDestroy, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-flyout',
  standalone: true,
  imports: [
    OverlayModule
  ],
  template: `
    <div #trigger (mouseenter)="onTriggerEnter()" (mouseleave)="onTriggerLeave()">
      <ng-content select="[flyout-trigger]"></ng-content>
    </div>
    <ng-content select="[flyout-content]"></ng-content>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FlyoutComponent implements OnDestroy {
  @ViewChild('trigger', { read: ElementRef, static: true }) private trigger!: ElementRef;
  @ContentChild(TemplateRef) private contentTemplate!: TemplateRef<any>;

  private overlayRef: OverlayRef | null = null;
  private closeTimeout?: number;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  onTriggerEnter(): void {
    this.cancelClose();
    if (!this.overlayRef) {
      this.open();
    }
  }

  onTriggerLeave(): void {
    this.scheduleClose();
  }

  private open(): void {
    if (!this.contentTemplate) {
      console.error('Flyout component was not created');
      return;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.trigger.nativeElement)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 8,
        }
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const portal = new TemplatePortal(this.contentTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.overlayRef.overlayElement.addEventListener('mouseenter', this.onContentEnter);
    this.overlayRef.overlayElement.addEventListener('mouseleave', this.onContentLeave);
  }

  private close(): void {
    if (this.overlayRef) {
      this.overlayRef.overlayElement.removeEventListener('mouseenter', this.onContentEnter);
      this.overlayRef.overlayElement.removeEventListener('mouseleave', this.onContentLeave);
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private scheduleClose(): void {
    this.closeTimeout = window.setTimeout(() => this.close(), 150);
  }

  private cancelClose(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  private onContentEnter = (): void => {
    this.cancelClose();
  }

  private onContentLeave = (): void => {
    this.scheduleClose();
  }

  ngOnDestroy(): void {
    this.close();
  }
}
