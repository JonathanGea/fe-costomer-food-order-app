
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
      provideAnimationsAsync(),
      providePrimeNG({
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: false
            }
        }
    }),
    provideHttpClient()
  ]
};

