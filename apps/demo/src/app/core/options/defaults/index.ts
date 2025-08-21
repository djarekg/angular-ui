import { MAT_FORM_FIELDS } from '@/core/options/defaults/mat-form-field.js';
import { MAT_ICON } from '@/core/options/defaults/mat-icon.js';
import {
  EnvironmentProviders,
  importProvidersFrom,
  makeEnvironmentProviders,
} from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

export const provideDefaultOptions = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    importProvidersFrom(MatNativeDateModule),
    MAT_FORM_FIELDS,
    MAT_ICON,
  ]);
};
