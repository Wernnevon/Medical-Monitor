import { Component, input, output } from '@angular/core';

export type ButtonStyle = 'submit' | 'back' | 'danger';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="'btn btn--' + styleType()"
      (click)="pressed.emit()"
    >
      <ng-content />
    </button>
  `,
  styleUrl: './button.scss',
})
export class Button {
  readonly type = input<'submit' | 'reset' | 'button'>('button');
  readonly styleType = input<ButtonStyle>('submit');
  readonly disabled = input(false);

  readonly pressed = output<void>();
}
