import { required, schema } from '@angular/forms/signals';
import { SigninModel } from './signin.model.js';

export const signinSchema = schema<SigninModel>(path => {
  required(path.username, { message: 'Username is required' });
  required(path.password, { message: 'Password is required' });
});
