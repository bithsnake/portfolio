import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { GameTabComponent } from './components/game-tab/game-tab.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [TabsModule, AboutTabComponent, GameTabComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Kimmo Savilampi - Portfolio';
}
