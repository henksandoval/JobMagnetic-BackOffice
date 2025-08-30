import { Component, Input, Optional, Self, ViewEncapsulation } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { ControlValueAccessorBase } from '@shared/directives/control-value-accessor.directive';

export interface RadioOption {
  value: string | number | boolean;
  label: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  styleUrls: ['./radio-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex flex-col">
      <label class="mb-3 font-medium text-sm text-gray-700 dark:text-gray-300">{{ label }}</label>
      <mat-radio-group [formControl]="control" class="flex flex-col sm:flex-row gap-4">
        @for (option of options; track option.value) {
          <mat-radio-button [value]="option.value">{{ option.label }}</mat-radio-button>
        }
      </mat-radio-group>
    </div>
  `,
})
export class RadioGroupComponent extends ControlValueAccessorBase {
  @Input() options: RadioOption[] = [];

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }
}
