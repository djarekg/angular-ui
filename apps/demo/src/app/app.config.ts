import { apiInterceptor } from '@/core/api/api.interceptor.js';
import { provideDefaultOptions } from '@/core/options/defaults/index.js';
import { provideErrorHandler } from '@/core/providers/error-handler.js';
import { routerProviders } from '@/core/providers/router.js';
import { provideWindow } from '@/core/providers/window.js';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { Colors, Legend, LineController } from 'chart.js';
import { provideCharts } from 'ng2-charts';
import { authInterceptor } from './core/auth/auth.interceptor.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(
      withIncrementalHydration(),
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: true,
      }),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiInterceptor, authInterceptor]),
    ),
    routerProviders,
    provideErrorHandler(),
    provideWindow(),
    provideDefaultOptions(),
    provideCharts({ registerables: [LineController, Legend, Colors] }),
  ],
};
