import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about-tab',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './about-tab.component.html',
  styleUrl: './about-tab.component.scss',
})
export class AboutTabComponent {
  readonly linkedInUrl = 'https://www.linkedin.com/in/kimmo-savilampi-95562b40/';
  readonly steamGameUrl = 'https://store.steampowered.com/app/1269910/Aria_Disconnect/';
  readonly githubUrl = 'https://github.com/bithsnake';

  // The stack diagram in the "full stack" tile, top (user) to bottom (infra).
  readonly layers = ['ui', 'api', 'realtime', 'data', 'cloud'];

  // Rendered twice back to back so the marquee can loop without a visible seam.
  readonly tech = [
    'TypeScript',
    'React',
    'Next.js',
    'Angular',
    'Node.js',
    'Fastify',
    'Express',
    'WebSockets',
    'PostgreSQL',
    'Redux Toolkit',
    'Kubernetes',
    'AWS',
    'Docker',
    'GitOps',
    '.NET / C#',
    'Tailwind CSS',
    'Amplitude',
    'Vitest',
  ];
}
