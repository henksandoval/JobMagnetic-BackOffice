import {effect, Injectable, signal} from '@angular/core';
import {StorageKey} from '@core/constants/storage-key';
import {Theme} from '@core/constants/theme';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  public readonly sidenavIsCollapsed = signal<boolean>(this.getInitialState(StorageKey.SidenavCollapsed, 'false') === 'true');
  public readonly sidenavIsHidden = signal<boolean>(this.getInitialState(StorageKey.SidenavHidden, 'false') === 'true');
  public readonly currentTheme = signal<Theme>(this.getInitialState(StorageKey.Theme, Theme.Light) as Theme);

  constructor() {
    effect(() => {
      localStorage.setItem(StorageKey.Theme, this.currentTheme());
      localStorage.setItem(StorageKey.SidenavCollapsed, String(this.sidenavIsCollapsed()));
      localStorage.setItem(StorageKey.SidenavHidden, String(this.sidenavIsHidden()));
    });
  }

  public toggleTheme(): void {
    this.currentTheme.update(current => current === Theme.Light ? Theme.Dark : Theme.Light);
  }

  public toggleSidenavVisibility(): void {
    this.sidenavIsHidden.update(value => !value);
  }

  public toggleSidenavSmart(): void {
    if (this.sidenavIsHidden()) {
      this.sidenavIsHidden.set(false);
    } else {
      this.sidenavIsCollapsed.update(value => !value);
    }
  }
  private getInitialState(key: StorageKey, defaultValue: string): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  }
}
