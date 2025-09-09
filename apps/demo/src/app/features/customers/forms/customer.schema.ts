import { AppCustomerModel } from '@/features/customers/forms/customer.model.js';
import { required, schema } from '@angular/forms/signals';

export const customerSchema = schema<AppCustomerModel>(path => {
  required(path.name, { message: 'Name is required' });
  required(path.phone, { message: 'Phone is required' });
  required(path.streetAddress, { message: 'Street Address is required' });
  required(path.city, { message: 'City is required' });
  required(path.stateId, { message: 'State is required' });
  required(path.zip, { message: 'ZIP is required' });
});
