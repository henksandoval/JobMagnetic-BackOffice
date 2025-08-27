import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ControlValueAccessorBase } from '@shared/directives/control-value-accessor.directive';

export interface SelectOption {
  value: string | number;
  name: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{ label }}</mat-label>
      <mat-select [formControl]="control">
        @for (option of options; track option.value) {
          <mat-option [value]="option.value">{{ option.name }}</mat-option>
        }
      </mat-select>

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
export class SelectComponent extends ControlValueAccessorBase {
  @Input() options: SelectOption[] = [];

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }
}
