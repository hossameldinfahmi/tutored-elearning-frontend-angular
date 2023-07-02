import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req);
  }
}

// let token = localStorage.getItem("Authorization");
// const authReq = req.clone({
//   headers: req.headers.set("x-auth-token", `${token}`),
// });
// return next.handle(authReq);
