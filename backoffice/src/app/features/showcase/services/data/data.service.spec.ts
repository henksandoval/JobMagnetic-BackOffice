import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// OPTIMIZACIÓN: Interfaces para un tipado robusto y reutilizable.
export interface Country {
  name: string;
  code: string;
}

export interface SubscriptionOption {
  label: string;
  value: SubscriptionType;
}

// OPTIMIZACIÓN: Type alias para consistencia y evitar "magic strings".
export type SubscriptionType = 'free' | 'premium' | 'enterprise';

@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class FormDataService {
  getCountries(): Observable<Country[]> {
    const countries: Country[] = [
      { name: 'España', code: 'ES' },
      { name: 'México', code: 'MX' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Estados Unidos', code: 'US' },
    ];
    // Simulamos una llamada a API con un 'of' y 'delay'
    return of(countries).pipe(delay(500));
  }

  getSubscriptionTypes(): Observable<SubscriptionOption[]> {
    const subscriptionTypes: SubscriptionOption[] = [
      { label: 'Gratis', value: 'free' },
      { label: 'Premium', value: 'premium' },
      { label: 'Empresarial', value: 'enterprise' },
    ];
    return of(subscriptionTypes);
  }

  // OPTIMIZACIÓN: La lógica de guardado también pertenece al servicio.
  saveProfile(profileData: any): Observable<{ success: boolean }> {
    console.log('Enviando datos al servidor...', profileData);
    // Simula una petición HTTP POST
    return of({ success: true }).pipe(delay(1000));
  }
}
