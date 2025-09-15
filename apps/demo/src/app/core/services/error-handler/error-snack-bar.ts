import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarRef } from '@angular/material/snack-bar';

export type ErrorSnackBarData = {
  message: string;
  actionText?: string;
};

@Component({
  selector: 'app-error-snack-bar',
  imports: [MatButtonModule, MatSnackBarAction],
  template: `
    {{ message }}
    <button
      class="app-error-snack-bar-button"
      type="button"
      matButton="text"
      matSnackBarAction
      [attr.text]="actionText"
      (click)="snackBarRef.dismissWithAction()"
    >
      {{ actionText }}
    </button>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }

    button {
      margin-inline-start: 10px;
    }
  `],
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
