import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { GameTabComponent } from './components/game-tab/game-tab.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    TabViewModule,
    AboutTabComponent,
    GameTabComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Kimmo Savilampi - Portfolio';
}
