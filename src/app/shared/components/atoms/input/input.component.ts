import { Component, Input, Optional, Self, ViewEncapsulation } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ControlValueAccessorBase } from '@shared/directives/control-value-accessor.directive';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-form-field
      appearance="outline"
      class="w-full transition-all duration-300 hover:scale-[1.01]"
      [class.mat-form-field-invalid]="control?.invalid && (control?.touched || control?.dirty)">
      <mat-label>{{ label }}</mat-label>
      <input [formControl]="control" [placeholder]="placeholder" [type]="type" matInput />
      @if (icon) {
        <mat-icon matSuffix>{{ icon }}</mat-icon>
      }

      @if (control?.invalid && (control?.touched || control?.dirty)) {
        <mat-error>
          @for (error of control.errors | keyvalue; track error.key) {
            @if (errors[error.key]) {
              <span>{{ errors[error.key] }}</span>
            }
          }
        </mat-error>
      }
    </mat-form-field>
  `,
})
export class InputComponent extends ControlValueAccessorBase {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() icon: string | null = null;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }
}
