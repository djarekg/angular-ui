import { isPlatformServer } from '@angular/common';
import {
  inject,
  PLATFORM_ID,
} from '@angular/core';

export const injectIsServer = () => isPlatformServer(inject(PLATFORM_ID));
