import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarRef } from '@angular/material/snack-bar';

export type ErrorSnackBarData = {
  message: string;
  actionText?: string;
};

@Component({
  selector: 'app-error-snack-bar',
  imports: [MatSnackBarAction],
  template: `
    {{ message }}
    <button
      class="app-error-snack-bar-button"
      type="button"
      matSnackBarAction
      [attr.text]="actionText"
      (click)="snackBarRef.dismissWithAction()"
    >
      {{ actionText }}
    </button>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorSnackBar {
  protected message: string | undefined;
  protected actionText: string | undefined;
  protected snackBarRef = inject(MatSnackBarRef<ErrorSnackBar>);

  constructor() {
    const { message, actionText } = inject(MAT_SNACK_BAR_DATA);
    this.message = message;
    this.actionText = actionText;
  }
}
