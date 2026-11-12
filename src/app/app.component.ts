import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { ExperienceTabComponent } from './components/experience-tab/experience-tab.component';
import { GameTabComponent } from './components/game-tab/game-tab.component';
import { OtherProjectsTabComponent } from './components/other-projects-tab/other-projects-tab.component';
import { FooterComponent } from './components/footer/footer.component';

type LanguageCode = 'en' | 'sv' | 'fi' | 'uk';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    AboutTabComponent,
    ExperienceTabComponent,
    GameTabComponent,
    OtherProjectsTabComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly sections = ['about', 'experience', 'game', 'projects'] as const;
  readonly languages: LanguageCode[] = ['en', 'sv', 'fi', 'uk'];
  // 'uk' is the ISO code for Ukrainian, but "UK" reads as United Kingdom on a
  // button, so the switcher shows the country-style label instead.
  readonly languageLabels: Record<LanguageCode, string> = {
    en: 'EN',
    sv: 'SV',
    fi: 'FI',
    uk: 'UA',
  };
  readonly languageNameKeys: Record<LanguageCode, string> = {
    en: 'app.language.english',
    sv: 'app.language.swedish',
    fi: 'app.language.finnish',
    uk: 'app.language.ukrainian',
  };

  activeSection = signal<string>('about');
  language = signal<LanguageCode>('en');
  isDarkMode = signal(true);
  scrolled = signal(false);
  themeToggleKey = computed(() =>
    this.isDarkMode() ? 'app.theme.switchToLight' : 'app.theme.switchToDark',
  );

  private sectionObserver?: IntersectionObserver;
  private onScroll = () => this.scrolled.set(window.scrollY > 8);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService,
  ) {
    this.initializeTheme();
  }

  ngOnInit(): void {
    this.translate.addLangs(this.languages);
    this.translate.setFallbackLang('en');
    this.setLanguage(this.getInitialLanguage());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();

    // A thin band across the middle of the viewport decides which section is
    // "current", so the nav highlight flips when a section reaches the centre
    // rather than as soon as its first pixel appears.
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.activeSection.set(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of this.sections) {
      const el = this.document.getElementById(id);
      if (el) this.sectionObserver.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
    this.document.documentElement.classList.toggle('theme-dark', this.isDarkMode());
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
      } catch {
        // Storage can be blocked (private mode); the toggle still works for this visit.
      }
    }
  }

  setLanguage(code: string): void {
    const resolved = (this.languages as string[]).includes(code)
      ? (code as LanguageCode)
      : 'en';
    this.language.set(resolved);
    this.translate.use(resolved);
    this.document.documentElement.lang = resolved;
    if (isPlatformBrowser(this.platformId)) {
      const maxAge = 60 * 60 * 24 * 365;
      this.document.cookie = `language=${resolved};path=/;max-age=${maxAge}`;
    }
  }

  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {
      stored = null;
    }
    // Dark is the default look; light only when chosen or preferred by the OS.
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    this.isDarkMode.set(stored ? stored === 'dark' : !prefersLight);
    this.document.documentElement.classList.toggle('theme-dark', this.isDarkMode());
  }

  private getInitialLanguage(): string {
    if (!isPlatformBrowser(this.platformId)) return 'en';
    const match = this.document.cookie.match(/(?:^|; )language=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : 'en';
  }
}
