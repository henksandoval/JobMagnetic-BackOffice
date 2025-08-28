import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSliderModule,
    MatButtonToggleModule
  ],
  template: `
    <div class="bg-card p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">Material Components Showcase Form</h1>

      <form class="example-form">
        <mat-form-field class="example-full-width">
          <mat-label>Favorite food</mat-label>
          <input matInput placeholder="Ex. Pizza">
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Leave a comment</mat-label>
          <textarea matInput placeholder="Ex. It makes me feel..."></textarea>
        </mat-form-field>
      </form>

      <form [formGroup]="showcaseForm" (ngSubmit)="onSubmit()" class="space-y-8">

        <!-- Section 1: Basic Inputs -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold mb-4 pb-2 border-b">Basic Input Fields</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Text Input -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Full Name</mat-label>
              <input matInput placeholder="John Doe" formControlName="fullName">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="showcaseForm.get('fullName')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <!-- Email Input -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email Address</mat-label>
              <input matInput type="email" placeholder="john@example.com" formControlName="email">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="showcaseForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <!-- Password Input -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>

            <!-- Number Input -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Age</mat-label>
              <input matInput type="number" placeholder="25" formControlName="age">
              <mat-icon matSuffix>calendar_today</mat-icon>
            </mat-form-field>
          </div>

          <!-- Textarea -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Biography</mat-label>
            <textarea matInput rows="4" placeholder="Tell us about yourself..." formControlName="bio"></textarea>
            <mat-hint align="end">{{showcaseForm.get('bio')?.value?.length || 0}}/500</mat-hint>
          </mat-form-field>
        </section>

        <!-- Section 2: Selection Controls -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold mb-4 pb-2 border-b">Selection Controls</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Select -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Country</mat-label>
              <mat-select formControlName="country">
                <mat-option value="us">United States</mat-option>
                <mat-option value="uk">United Kingdom</mat-option>
                <mat-option value="ca">Canada</mat-option>
                <mat-option value="au">Australia</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Multiple Select -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Languages</mat-label>
              <mat-select formControlName="languages" multiple>
                <mat-option value="en">English</mat-option>
                <mat-option value="es">Spanish</mat-option>
                <mat-option value="fr">French</mat-option>
                <mat-option value="de">German</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Date Picker -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Date of Birth</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="dateOfBirth">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <!-- Autocomplete -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Favorite Framework</mat-label>
              <input matInput formControlName="framework" [matAutocomplete]="auto">
              <mat-autocomplete #auto="matAutocomplete">
                <mat-option value="angular">Angular</mat-option>
                <mat-option value="react">React</mat-option>
                <mat-option value="vue">Vue</mat-option>
                <mat-option value="svelte">Svelte</mat-option>
              </mat-autocomplete>
            </mat-form-field>
          </div>
        </section>

        <!-- Section 3: Radio, Checkbox, Toggle -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold mb-4 pb-2 border-b">Options & Toggles</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Radio Group -->
            <div>
              <label class="block mb-2 font-medium">Subscription Type</label>
              <mat-radio-group formControlName="subscription" class="flex flex-col gap-2">
                <mat-radio-button value="free">Free Plan</mat-radio-button>
                <mat-radio-button value="basic">Basic Plan ($9/mo)</mat-radio-button>
                <mat-radio-button value="premium">Premium Plan ($19/mo)</mat-radio-button>
              </mat-radio-group>
            </div>

            <!-- Checkboxes & Toggle -->
            <div class="space-y-3">
              <mat-checkbox formControlName="newsletter">
                Subscribe to newsletter
              </mat-checkbox>

              <mat-checkbox formControlName="terms">
                I accept the terms and conditions
              </mat-checkbox>

              <mat-slide-toggle formControlName="notifications">
                Enable push notifications
              </mat-slide-toggle>
            </div>
          </div>

          <!-- Button Toggle -->
          <div>
            <label class="block mb-2 font-medium">Preferred Contact Method</label>
            <mat-button-toggle-group formControlName="contactMethod" class="w-full">
              <mat-button-toggle value="email" class="flex-1">
                <mat-icon>email</mat-icon> Email
              </mat-button-toggle>
              <mat-button-toggle value="phone" class="flex-1">
                <mat-icon>phone</mat-icon> Phone
              </mat-button-toggle>
              <mat-button-toggle value="sms" class="flex-1">
                <mat-icon>sms</mat-icon> SMS
              </mat-button-toggle>
            </mat-button-toggle-group>
          </div>

          <!-- Slider -->
          <div>
            <label class="block mb-2 font-medium">Experience Level ({{showcaseForm.get('experience')?.value}}%)</label>
            <mat-slider min="0" max="100" step="10" class="w-full">
              <input matSliderThumb formControlName="experience">
            </mat-slider>
          </div>
        </section>

        <!-- Actions -->
        <div class="flex justify-end gap-4 pt-6 border-t">
          <button mat-stroked-button type="button" (click)="resetForm()">
            <mat-icon>clear</mat-icon> Reset
          </button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!showcaseForm.valid">
            <mat-icon>save</mat-icon> Submit
          </button>
        </div>
      </form>

      <!-- Form Value Display -->
      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <h3 class="font-semibold mb-2">Form Value:</h3>
        <pre class="text-sm overflow-auto">{{ showcaseForm.value | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }

    mat-radio-button {
      margin-bottom: 0 !important;
    }

    mat-form-field {
      margin-bottom: 0 !important;
    }
  `]
})
export class FormBaseComponent {
  hidePassword = true;
  showcaseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.showcaseForm = this.fb.group({
      // Basic inputs
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: [null],
      bio: ['', Validators.maxLength(500)],

      // Selections
      country: [''],
      languages: [[]],
      dateOfBirth: [null],
      framework: [''],

      // Options
      subscription: ['free'],
      newsletter: [false],
      terms: [false, Validators.requiredTrue],
      notifications: [true],
      contactMethod: ['email'],
      experience: [50]
    });
  }

  onSubmit() {
    if (this.showcaseForm.valid) {
      console.log('Form submitted:', this.showcaseForm.value);
    }
  }

  resetForm() {
    this.showcaseForm.reset({
      subscription: 'free',
      notifications: true,
      contactMethod: 'email',
      experience: 50
    });
  }
}
