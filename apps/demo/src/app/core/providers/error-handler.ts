import { AppErrorHandler } from '@/core/services/error-handler/app-error-handler.js';
import { ErrorHandler, makeEnvironmentProviders } from '@angular/core';

export const provideErrorHandler = () => {
  return makeEnvironmentProviders([
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
  ]);
};
