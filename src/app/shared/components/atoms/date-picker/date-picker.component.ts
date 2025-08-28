import { Component, inject } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ControlValueAccessorBase } from '@shared/directives/control-value-accessor.directive';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  styleUrls: ['./date-picker.component.scss'],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{ label }}</mat-label>
      <input [formControl]="control" [matDatepicker]="picker" matInput />
      <mat-datepicker-toggle [for]="picker" matSuffix></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>

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
export class DatePickerComponent extends ControlValueAccessorBase {
  public override ngControl = inject(NgControl, { optional: true, self: true });
}
