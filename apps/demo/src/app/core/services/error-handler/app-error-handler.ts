import { injectIsServer } from '@/core/utils/is-server.js';
import { DOCUMENT, ErrorHandler, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackBar, ErrorSnackBarData } from './error-snack-bar.js';

export class AppErrorHandler implements ErrorHandler {
  readonly #snackbar = inject(MatSnackBar);
  readonly #document = inject(DOCUMENT);
  readonly #isServer = injectIsServer();

  get #isOnline() {
    if (this.#isServer) return false;

    const win = this.#document.defaultView;
    return win?.navigator.onLine ?? true;
  }

  handleError(error: Error) {
    if (typeof error.message === 'string') {
      const firstLine = error.message.split('\n')[0];

      if (this.#isOnline && firstLine?.match(/chunk-(.*?)\.js/)) {
        this.#openSnackBar();
      }
      else {
        this.#openSnackBar(error.message);
      }
    }

    console.error(error);
  }

  #openSnackBar(message = 'There was a critical error.', actionText = 'OK') {
    this.#snackbar.openFromComponent(
      ErrorSnackBar,
      {
        panelClass: 'app-snackbar-error',
        data: {
          message,
          actionText,
        } satisfies ErrorSnackBarData,
      },
    ) /*.onAction()
      .subscribe(() => {
        this.#document.location.reload();
      })*/;
  }
}
