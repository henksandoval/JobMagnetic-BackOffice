import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

export interface RadioOption {
  value: string | number | boolean;
  label: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './radio-group.component.html',
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: RadioOption[] = [];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }
}
