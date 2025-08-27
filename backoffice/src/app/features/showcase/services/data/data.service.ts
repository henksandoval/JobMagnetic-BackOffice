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

export interface UserProfileForm {
  fullName: string;
  email: string;
  country: string | null;
  dob: Date | null;
  bio: string;
  subscriptionType: SubscriptionType;
  wantsNewsletter: boolean;
  pushNotifications: boolean;
  agreesToTerms: boolean;
}

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
      { label: $localize`:Label for free subscription type@@global.subscriptionTypes.free:Free`, value: 'free' },
      { label: $localize`:Label for premium subscription type@@global.subscriptionTypes.premium:Premium`, value: 'premium' },
      { label: $localize`:Label for enterprise subscription type@@global.subscriptionTypes.enterprise:Enterprise`, value: 'enterprise' },
    ];
    return of(subscriptionTypes);
  }

  saveProfile(profileData: UserProfileForm): Observable<{ success: boolean }> {
    console.log('Sending data to server...', profileData);
    return of({ success: true }).pipe(delay(1000));
  }
}
