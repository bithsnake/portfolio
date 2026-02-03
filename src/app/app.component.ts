import {
  Component,
  Inject,
  computed,
  effect,
  signal,
  OnInit,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { GameTabComponent } from './components/game-tab/game-tab.component';
import { OtherProjectsTabComponent } from './components/other-projects-tab/other-projects-tab.component';
import { FooterComponent } from './components/footer/footer.component';

type LanguageOption = {
  code: string;
  labelKey: string;
  emoji: string;
};

@Component({
  selector: 'app-root',
  imports: [
    TabsModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    TranslateModule,
    AboutTabComponent,
    GameTabComponent,
    OtherProjectsTabComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  activeTab = signal<string | number>('0');

  isDarkMode = signal(false);
  themeToggleKey = computed(() =>
    this.isDarkMode() ? 'app.theme.switchToLight' : 'app.theme.switchToDark',
  );

  languageOptions: LanguageOption[] = [
    { code: 'en', labelKey: 'app.language.english', emoji: '🇬🇧' },
    { code: 'sv', labelKey: 'app.language.swedish', emoji: '🇸🇪' },
  ];

  selectedLanguage: LanguageOption = this.languageOptions[0];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService,
  ) {
    this.initializeTheme();
    effect(() => {
      this.activeTab();
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnInit(): void {
    this.translate.addLangs(this.languageOptions.map((lang) => lang.code));
    this.translate.setFallbackLang('en');

    const initialLanguage = this.getInitialLanguage();
    this.applyLanguage(initialLanguage);
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

  onLanguageChange(option: LanguageOption | null): void {
    if (!option) {
      return;
    }

    this.applyLanguage(option.code);
  }

  private applyLanguage(languageCode: string): void {
    const resolvedLanguage =
      this.languageOptions.find((lang) => lang.code === languageCode) ??
      this.languageOptions[0];

    this.selectedLanguage = resolvedLanguage;
    this.translate.use(resolvedLanguage.code);
    this.setLanguageCookie(resolvedLanguage.code);
  }

  private getInitialLanguage(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    const cookieValue = this.getCookie('language');
    if (cookieValue) {
      return cookieValue;
    }

    return 'en';
  }

  private setLanguageCookie(languageCode: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const maxAge = 60 * 60 * 24 * 365;
    this.document.cookie = `language=${languageCode};path=/;max-age=${maxAge}`;
  }

  private getCookie(name: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const match = this.document.cookie.match(
      new RegExp(
        `(?:^|; )${name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1')}=([^;]*)`,
      ),
    );
    return match ? decodeURIComponent(match[1]) : null;
  }
}
