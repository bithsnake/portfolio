import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient, platformId: object) => ({
          getTranslation: (lang: string) =>
            isPlatformBrowser(platformId)
              ? http.get(`i18n/${lang}.json`)
              : of({}),
        }),
        deps: [HttpClient, PLATFORM_ID],
      },
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
