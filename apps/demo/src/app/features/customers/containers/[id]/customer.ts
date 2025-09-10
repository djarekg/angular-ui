import { Spinner } from '@/components/spinner/spinner';
import { FormMode } from '@/core/constants/form-mode.js';
import { CustomerDetail } from '@/features/customers/components/customer-detail/customer-detail.js';
import { AppCustomerModel } from '@/features/customers/forms/customer.model.js';
import { CustomerService } from '@/features/customers/services/customer.service.js';
import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-customer',
  imports: [
    CustomerDetail,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    Spinner,
  ],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-loader',
  },
})
export default class Customer {
  readonly #service = inject(CustomerService);
  readonly #snackbar = inject(MatSnackBar);
  readonly #id = signal('');

  protected readonly mode = signal<FormMode>(FormMode.view);

  protected readonly resource = resource({
    params: () => ({ id: this.#id() }),
    loader: ({ params: { id } }) => this.#service.getCustomer(id),
  });

  constructor(route: ActivatedRoute) {
    route.params.pipe(
      map(params => params['id'] as string),
      distinctUntilChanged(),
      tap(id => this.#id.set(id)),
    ).subscribe();

    route.queryParams.pipe(
      map(params => params['mode'] as FormMode || FormMode.view),
      distinctUntilChanged(),
      tap(mode => this.mode.set(mode)),
    ).subscribe();
  }

  protected onCancel() {
    this.mode.set(FormMode.view);
    this.resource.reload();
  }

  protected onEdit() {
    this.mode.set(FormMode.edit);
  }

  protected async onSave(customer: AppCustomerModel) {
    await this.#service.updateCustomer(this.#id(), customer);

    this.mode.set(FormMode.view);

    this.#snackbar.open('Customer updated successfully', 'OK', {
      duration: 5000,
      panelClass: 'app-snackbar-success',
    });
  }
}
