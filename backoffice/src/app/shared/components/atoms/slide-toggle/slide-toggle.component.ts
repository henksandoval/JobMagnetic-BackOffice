import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule, MatError],
  templateUrl: './slide-toggle.component.html',
})
export class SlideToggleComponent implements ControlValueAccessor {
  /** El texto que se mostrará junto al control. */
  @Input() label: string = '';

  /** El color del toggle (primary, accent, warn). */
  @Input() color: ThemePalette = 'primary';

  /** Un mapa de errores de validación a mensajes de texto. */
  @Input() errors: Record<string, string> = {};

  // --- Implementación de ControlValueAccessor ---
  isDisabled: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      // Vincula este componente con el sistema de formularios de Angular.
      this.ngControl.valueAccessor = this;
    }
  }

  /** Proporciona un acceso fácil al FormControl desde la plantilla. */
  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  onChange: (value: any) => void = () => {};

  // Estos métodos son requeridos por la interfaz, pero la vinculación

  onTouched: () => void = () => {};

  // [formControl] se encarga de la mayor parte del trabajo por nosotros.
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
}
