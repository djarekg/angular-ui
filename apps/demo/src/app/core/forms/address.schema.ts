import { required, schema } from '@angular/forms/signals';

type AddressModel = {
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  stateId: number;
  zip: string;
};

export const addressSchema = schema<AddressModel>(path => {
  required(path.streetAddress, { message: 'Street Address is required' });
  required(path.city, { message: 'City is required' });
  required(path.stateId, { message: 'State is required' });
  required(path.zip, { message: 'ZIP is required' });
});
