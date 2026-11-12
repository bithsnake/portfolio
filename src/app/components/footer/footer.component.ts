import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = signal(new Date().getFullYear());
  readonly linkedInUrl = 'https://www.linkedin.com/in/kimmo-savilampi-95562b40/';
  readonly githubUrl = 'https://github.com/bithsnake';
}
