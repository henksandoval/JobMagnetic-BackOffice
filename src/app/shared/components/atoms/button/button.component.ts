import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonIntent = 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() intent: ButtonIntent = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Output() action = new EventEmitter<void>();

  onClick(): void {
    if (this.disabled) {
      return;
    }
    this.action.emit();
  }

  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const intentClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    };

    const sizeClasses = {
      sm: 'h-9 px-3',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8'
    };

    return `${baseClasses} ${intentClasses[this.intent]} ${sizeClasses[this.size]}`;
  }
}
