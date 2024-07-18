import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HIGHLIGHT_OPTIONS, provideHighlightOptions } from 'ngx-highlightjs';
import { provideMarkdown } from 'ngx-markdown';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync('noop'),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    }),
    [provideRouter(routes)],
    provideMarkdown(),
    provideHttpClient()
  ]
};
