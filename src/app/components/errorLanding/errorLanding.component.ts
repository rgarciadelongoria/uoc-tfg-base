import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-landing',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>errorLanding works!</p>`,
  styleUrl: './errorLanding.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorLandingComponent { }
