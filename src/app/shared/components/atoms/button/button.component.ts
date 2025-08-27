import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type ButtonVariant = 'flat' | 'stroked' | 'raised' | 'icon' | 'fab' | 'mini-fab';
type ButtonColor = 'primary' | 'accent' | 'warn' | undefined;

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'raised';
  @Input() color: ButtonColor = undefined;
  @Input() disabled: boolean = false;
  @Output() action = new EventEmitter<void>();

  onClick(): void {
    if (this.disabled) {
      return;
    }
    this.action.emit();
  }
}
