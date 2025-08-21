import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isServer = false;
  const token = isServer ? null : localStorage.getItem('token');

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Token ${token}` } });
  }

  return next(req);
};
