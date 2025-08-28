import { Component, Input, Optional, Self, ViewEncapsulation } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ControlValueAccessorBase } from '@shared/directives/control-value-accessor.directive';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, TextFieldModule],
  styleUrls: ['./text-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{ label }}</mat-label>
      <textarea
        #autosize="cdkTextareaAutosize"
        [cdkAutosizeMaxRows]="maxRows"
        [cdkAutosizeMinRows]="minRows"
        [formControl]="control"
        [placeholder]="placeholder"
        cdkTextareaAutosize
        matInput
      ></textarea>
    </mat-form-field>
  `,
})
export class TextAreaComponent extends ControlValueAccessorBase {
  @Input() placeholder = '';
  @Input() minRows = 3;
  @Input() maxRows = 5;

  constructor(@Optional() @Self() public override ngControl: NgControl) {
    super(ngControl);
  }
}
