import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// --- Importaciones de Angular Material ---
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextFieldModule } from '@angular/cdk/text-field'; // Para el textarea auto-ajustable

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // --- Módulos de Material ---
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSlideToggleModule,
    TextFieldModule,
  ],
  template: `
    <!-- Contenedor principal del formulario con un título -->
    <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Perfil de Usuario</h2>

      <!-- El tag <form> utiliza el formGroup y el evento ngSubmit -->
      <form [formGroup]="userProfileForm" (ngSubmit)="onSubmit()">
        <!-- Layout en Grid para un formulario responsive -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <!-- Campo: Nombre Completo (Input de texto) -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Nombre Completo</mat-label>
            <input matInput formControlName="fullName" placeholder="Ej. Juan Pérez" />
            <mat-icon matSuffix>person</mat-icon>
            @if (userProfileForm.get('fullName')?.hasError('required')) {
              <mat-error>El nombre es requerido.</mat-error>
            }
          </mat-form-field>

          <!-- Campo: Email (Input de email) -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Correo Electrónico</mat-label>
            <input matInput formControlName="email" placeholder="ejemplo@correo.com" type="email" />
            <mat-icon matSuffix>email</mat-icon>
            @if (userProfileForm.get('email')?.hasError('required')) {
              <mat-error>El correo es requerido.</mat-error>
            }
            @if (userProfileForm.get('email')?.hasError('email')) {
              <mat-error>Por favor, introduce un correo válido.</mat-error>
            }
          </mat-form-field>

          <!-- Campo: País (Select/Dropdown) -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>País de Residencia</mat-label>
            <mat-select formControlName="country">
              @for (country of countries; track country.code) {
                <mat-option [value]="country.code">{{ country.name }}</mat-option>
              }
            </mat-select>
            <mat-error>Debes seleccionar un país.</mat-error>
          </mat-form-field>

          <!-- Campo: Fecha de Nacimiento (Datepicker) -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Fecha de Nacimiento</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="dob" />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error>La fecha de nacimiento es requerida.</mat-error>
          </mat-form-field>

          <!-- Campo: Biografía (Textarea) -->
          <div class="md:col-span-2">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Biografía</mat-label>
              <textarea
                matInput
                formControlName="bio"
                cdkTextareaAutosize
                #autosize="cdkTextareaAutosize"
                cdkAutosizeMinRows="3"
                cdkAutosizeMaxRows="5"
                placeholder="Cuéntanos un poco sobre ti..."
              ></textarea>
            </mat-form-field>
          </div>

          <!-- Campo: Tipo de Suscripción (Radio Buttons) -->
          <div class="flex flex-col">
            <label class="mb-3 font-medium text-sm text-gray-700 dark:text-gray-300"
              >Tipo de Suscripción</label
            >
            <mat-radio-group formControlName="subscriptionType" class="flex flex-col sm:flex-row gap-4">
              @for (sub of subscriptionTypes; track sub) {
                <mat-radio-button [value]="sub.value">{{ sub.label }}</mat-radio-button>
              }
            </mat-radio-group>
          </div>

          <!-- Campo: Notificaciones (Checkbox y Slide Toggle) -->
          <div class="flex flex-col justify-center gap-4">
            <mat-checkbox formControlName="wantsNewsletter" color="primary">
              Deseo recibir el boletín informativo
            </mat-checkbox>
            <mat-slide-toggle formControlName="pushNotifications" color="primary">
              Activar notificaciones push
            </mat-slide-toggle>
          </div>
        </div>

        <!-- Checkbox de Términos y Condiciones (requerido) -->
        <div class="mt-8">
          <mat-checkbox formControlName="agreesToTerms" color="primary" class="text-sm">
            He leído y acepto los términos y condiciones de servicio.
          </mat-checkbox>
          @if (userProfileForm.get('agreesToTerms')?.hasError('required')) {
            <p class="text-red-500 text-xs mt-1">Debes aceptar los términos para continuar.</p>
          }
        </div>

        <!-- Botones de Acción -->
        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button type="button" mat-stroked-button (click)="resetForm()">Limpiar Formulario</button>
          <button type="submit" mat-flat-button color="primary" [disabled]="userProfileForm.invalid">
            Guardar Perfil
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      /*
     * Hacemos que el componente ocupe todo el ancho disponible.
     * El padding y el layout principal vienen del layout superior (showcase.component).
    */
      :host {
        display: block;
        width: 100%;
      }

      /*
     * Tailwind puede tener conflictos con los estilos por defecto de los form-fields de Material.
     * Esta regla asegura que el form-field se comporte correctamente dentro de un contenedor flex o grid.
    */
      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class FormComponent implements OnInit {
  userProfileForm!: FormGroup;

  countries = [
    { name: 'España', code: 'ES' },
    { name: 'México', code: 'MX' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Estados Unidos', code: 'US' },
  ];

  subscriptionTypes = [
    { label: 'Gratis', value: 'free' },
    { label: 'Premium', value: 'premium' },
    { label: 'Empresarial', value: 'enterprise' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      bio: [''],
      subscriptionType: ['free', [Validators.required]],
      wantsNewsletter: [true],
      pushNotifications: [false],
      agreesToTerms: [false, [Validators.requiredTrue]],
    });
  }

  onSubmit(): void {
    if (this.userProfileForm.invalid) {
      // Marcar todos los campos como "tocados" para mostrar los errores
      this.userProfileForm.markAllAsTouched();
      return;
    }
    console.log('Formulario Enviado:', this.userProfileForm.value);
    alert('¡Perfil guardado con éxito! Revisa la consola para ver los datos.');
  }

  resetForm(): void {
    this.userProfileForm.reset({
      subscriptionType: 'free',
      wantsNewsletter: true,
      pushNotifications: false,
    });
  }
}
