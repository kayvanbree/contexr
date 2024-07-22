import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideContexr } from '../../projects/contexr/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync('noop'),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    }),
    [provideRouter(routes)],
    provideHttpClient(),
    provideContexr({ cheatSheetCloseEsc: true })
  ]
};
