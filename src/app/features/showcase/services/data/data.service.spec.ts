import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Country {
  name: string;
  code: string;
}

export interface SubscriptionOption {
  label: string;
  value: SubscriptionType;
}

export type SubscriptionType = 'free' | 'premium' | 'enterprise';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  getCountries(): Observable<Country[]> {
    const countries: Country[] = [
      { name: 'Spain', code: 'ES' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Colombia', code: 'CO' },
      { name: 'United States', code: 'US' },
    ];
    return of(countries).pipe(delay(500));
  }

  getSubscriptionTypes(): Observable<SubscriptionOption[]> {
    const subscriptionTypes: SubscriptionOption[] = [
      { label: 'Free', value: 'free' },
      { label: 'Premium', value: 'premium' },
      { label: 'Enterprise', value: 'enterprise' },
    ];
    return of(subscriptionTypes);
  }

  saveProfile(profileData: any): Observable<{ success: boolean }> {
    console.log('Sending data to server...', profileData);
    return of({ success: true }).pipe(delay(1000));
  }
}
