import { environment } from '@/environment';
import { HttpInterceptorFn } from '@angular/common/http';

/**
 * This interceptor prepends the API URL. If the URL
 * starts with a `/` then it is a API call.
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    const { apiUrl } = environment;
    req = req.clone({ url: `${apiUrl}${req.url}` });
  }

  return next(req);
};
