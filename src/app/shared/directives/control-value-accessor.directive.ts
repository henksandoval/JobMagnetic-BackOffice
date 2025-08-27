import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Directive()
export abstract class ControlValueAccessorBase implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() errors: Record<string, string> = {};
  isDisabled: boolean = false;

  protected constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  public writeValue(obj: any): void {}

  public registerOnChange(fn: any): void {}

  public registerOnTouched(fn: any): void {}

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
