import { Component, Inject, computed, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { GameTabComponent } from './components/game-tab/game-tab.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    TabsModule,
    ButtonModule,
    AboutTabComponent,
    GameTabComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = signal('Kimmo Savilampi - Portfolio');
  activeTab = signal<string | number>('0');

  isDarkMode = signal(false);
  themeToggleLabel = computed(() =>
    this.isDarkMode() ? 'Switch to Light' : 'Switch to Dark',
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.initializeTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
    this.document.documentElement.classList.toggle(
      'theme-dark',
      this.isDarkMode(),
    );
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    }
  }

  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      this.isDarkMode.set(storedTheme === 'dark');
    } else {
      this.isDarkMode.set(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      );
    }

    this.document.documentElement.classList.toggle(
      'theme-dark',
      this.isDarkMode(),
    );
  }
}
