import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { SpinerService } from "../_services/spiner.service";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private spinnerService: SpinerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(1);

    if (
      request.url.endsWith("/trainers") ||
      request.url.endsWith("/student/courses") ||
      request.url.endsWith("/student/update") ||
      request.url.endsWith("/main/courses")
    ) {
      this.spinnerService.requestStarted();
    }

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestEnded();
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
        }
      )
    );
  }
}

// let token = localStorage.getItem("Authorization");
// const authReq = req.clone({
//   headers: req.headers.set("x-auth-token", `${token}`),
// });
// return next.handle(authReq);
