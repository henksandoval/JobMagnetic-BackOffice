import { Component, Input, Optional, Self, ViewEncapsulation } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';
import { ControlValueAccessorBase } from '@shared/directives/control-value-accessor.directive';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule, MatError],
  styleUrls: ['./slide-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>
      <mat-slide-toggle [color]="color" [formControl]="control">
        {{ label }}
      </mat-slide-toggle>
      @if (control?.invalid && (control?.touched || control?.dirty)) {
        <mat-error class="text-xs mt-1 block">
          @for (error of control.errors | keyvalue; track error.key) {
            @if (errors[error.key]) {
              <span>{{ errors[error.key] }}</span>
            }
          }
        </mat-error>
      }
    </div>
  `,
})
export class SlideToggleComponent extends ControlValueAccessorBase {
  @Input() color: ThemePalette = 'primary';

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }
}
