import { Component, Optional, Self, ViewEncapsulation } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessorBase } from '@shared/directives/control-value-accessor.directive';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule],
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>
      <mat-checkbox [formControl]="control" color="primary">
        {{ label }}
      </mat-checkbox>
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
export class CheckboxComponent extends ControlValueAccessorBase {
  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }
}
