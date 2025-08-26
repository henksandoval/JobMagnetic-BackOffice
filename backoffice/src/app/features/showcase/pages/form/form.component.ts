import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
  Country,
  FormDataService,
  SubscriptionType,
  UserProfileForm,
} from '../../services/data/data.service';
import { SelectComponent, SelectOption } from '@shared/components/atoms/select/select.component'; // Asegúrate que la ruta sea correcta
import { MatNativeDateModule } from '@angular/material/core';
import { InputComponent } from '@shared/components/atoms/input/input.component';
import { DatePickerComponent } from '@shared/components/atoms/date-picker/date-picker.component';
import { RadioGroupComponent } from '@shared/components/atoms/radio-group/radio-group.component';
import { CheckboxComponent } from '@shared/components/atoms/checkbox/checkbox.component';
import { ButtonComponent } from '@shared/components/atoms/button/button.component';
import { TextAreaComponent } from '@shared/components/atoms/text-area/text-area.component';
import { SlideToggleComponent } from '@shared/components/atoms/slide-toggle/slide-toggle.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    InputComponent,
    SelectComponent,
    DatePickerComponent,
    RadioGroupComponent,
    CheckboxComponent,
    ButtonComponent,
    TextAreaComponent,
    SlideToggleComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
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
  isFormInvalid = computed(() => {
    return !this.userProfileForm || this.userProfileForm.invalid;
  });
  readonly fullNameErrors = { required: 'El nombre es requerido.' };
  readonly emailErrors = {
    required: 'El correo es requerido.',
    email: 'Por favor, introduce un correo válido.',
  };
  readonly countryErrors = { required: 'Debes seleccionar un país.' };
  readonly dobErrors = { required: 'La fecha de nacimiento es requerida.' };
  readonly termsErrors = { requiredTrue: 'Debes aceptar los términos para continuar.' };
  private fb = inject(FormBuilder);
  private formDataService = inject(FormDataService);
  subscriptionTypes = toSignal(this.formDataService.getSubscriptionTypes(), { initialValue: [] });
  private countriesSource = toSignal(this.formDataService.getCountries(), { initialValue: [] });
  countriesForSelect = computed<SelectOption[]>(() =>
    this.countriesSource().map((country: Country) => ({
      value: country.code,
      name: country.name,
    }))
  );
  private initialState!: UserProfileForm;

  ngOnInit(): void {
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
    this.initialState = this.userProfileForm.getRawValue();
  }

  onSubmit(): void {
    if (this.isFormInvalid()) {
      this.userProfileForm.markAllAsTouched();
      return;
    }

    this.formDataService.saveProfile(this.userProfileForm.getRawValue()).subscribe({
      next: (response) => {
        if (response.success) {
          alert('¡Perfil guardado con éxito!');
          this.userProfileForm.markAsPristine();
        }
      },
      error: (err) => {
        console.error('Error al guardar el perfil:', err);
        alert('Hubo un error al guardar.');
      },
    });
  }

  resetForm(): void {
    this.userProfileForm.reset(this.initialState);
  }
}
