import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-tab',
  imports: [CardModule, ButtonModule, ButtonGroupModule, TranslateModule],
  templateUrl: './about-tab.component.html',
  styleUrl: './about-tab.component.scss',
})
export class AboutTabComponent {
  linkedInUrl = signal('https://www.linkedin.com/in/kimmo-savilampi-95562b40/');
  steamGameUrl = signal(
    'https://store.steampowered.com/app/1269910/Aria_Disconnect/',
  );
}
