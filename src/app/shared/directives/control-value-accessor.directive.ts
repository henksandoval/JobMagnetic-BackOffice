import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Directive()
export abstract class ControlValueAccessorBase implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() errors: Record<string, string> = {};
  isDisabled: boolean = false;

  // Agregar estas propiedades
  onChange: any = () => {};
  onTouched: any = () => {};

  protected constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  public writeValue(value: any): void {
    // Este método se llama cuando el FormControl cambia
    // No hacer nada aquí permite que el input maneje su propio valor
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
