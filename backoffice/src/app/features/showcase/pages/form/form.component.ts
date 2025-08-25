import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importaciones de tipos y servicio.
import {
  FormDataService,
  Country,
  SubscriptionOption,
  SubscriptionType,
  UserProfileForm,
} from '../../services/data/data.service';

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
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // Inyección de dependencias moderna y limpia con inject()
  private fb = inject(FormBuilder);
  private formDataService = inject(FormDataService);

  // Usamos el tipado del servicio.
  userProfileForm!: FormGroup<{
    fullName: FormControl<string>;
    email: FormControl<string>;
    country: FormControl<string | null>;
    dob: FormControl<Date | null>;
    bio: FormControl<string>;
    subscriptionType: FormControl<SubscriptionType>;
    wantsNewsletter: FormControl<boolean>;
    pushNotifications: FormControl<boolean>;
    agreesToTerms: FormControl<boolean>;
  }>;

  // Los datos ahora vienen del servicio.
  countries: Country[] = [];
  subscriptionTypes: SubscriptionOption[] = [];

  private initialState!: UserProfileForm; // Para un reset inteligente

  ngOnInit(): void {
    this.loadData();

    // Definimos la estructura y valores iniciales
    const formDefinition = {
      fullName: this.fb.nonNullable.control('', [Validators.required]),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      country: this.fb.control<string | null>(null, [Validators.required]),
      dob: this.fb.control<Date | null>(null, [Validators.required]),
      bio: this.fb.nonNullable.control(''),
      subscriptionType: this.fb.nonNullable.control<SubscriptionType>('free', [Validators.required]),
      wantsNewsletter: this.fb.nonNullable.control(true),
      pushNotifications: this.fb.nonNullable.control(false),
      agreesToTerms: this.fb.nonNullable.control(false, [Validators.requiredTrue]),
    };

    this.userProfileForm = this.fb.group(formDefinition);

    // Guardamos el estado inicial para el reset.
    this.initialState = this.userProfileForm.getRawValue();
  }

  private loadData(): void {
    this.formDataService.getCountries().subscribe((data) => (this.countries = data));
    this.formDataService.getSubscriptionTypes().subscribe((data) => (this.subscriptionTypes = data));
  }

  // Getters para simplificar el template y mejorar la legibilidad.
  get fullName() {
    return this.userProfileForm.controls.fullName;
  }
  get email() {
    return this.userProfileForm.controls.email;
  }
  get country() {
    return this.userProfileForm.controls.country;
  }
  get dob() {
    return this.userProfileForm.controls.dob;
  }
  get agreesToTerms() {
    return this.userProfileForm.controls.agreesToTerms;
  }

  onSubmit(): void {
    if (this.userProfileForm.invalid) {
      this.userProfileForm.markAllAsTouched();
      return;
    }

    // Delegamos el guardado al servicio.
    this.formDataService.saveProfile(this.userProfileForm.getRawValue()).subscribe({
      next: (response) => {
        if (response.success) {
          alert('¡Perfil guardado con éxito! Revisa la consola para ver los datos.');
          this.userProfileForm.markAsPristine(); // Marcar como no modificado
        }
      },
      error: (err) => {
        console.error('Error al guardar el perfil:', err);
        alert('Hubo un error al guardar. Inténtalo de nuevo.');
      },
    });
  }

  resetForm(): void {
    // Reseteamos al estado inicial guardado, no a uno vacío.
    this.userProfileForm.reset(this.initialState);
  }
}
