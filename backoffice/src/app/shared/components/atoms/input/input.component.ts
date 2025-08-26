import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// --- Importaciones de Angular Material ---
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() icon: string | null = null;
  @Input() errors: Record<string, string> = {};

  // Propiedades para ControlValueAccessor
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  value: string | number | null = null;
  isDisabled: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // Escribe un nuevo valor al elemento.
  writeValue(value: any): void {
    this.value = value;
  }

  // Registra un callback para ser llamado cuando el valor del control cambia en la UI.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registra un callback para ser llamado cuando el control se marca como 'touched'.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Función llamada cuando el estado de 'disabled' del control cambia.
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Helper para acceder al control desde la plantilla.
  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }
}
