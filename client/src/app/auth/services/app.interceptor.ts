import { HttpInterceptorFn } from '@angular/common/http';
import { getToken } from "./helper-service";

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('TEST INTERCEPTOR', getToken());
  req = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${getToken()}`)
  })
  return next(req);
};
