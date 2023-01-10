import { Inject, Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      return next.handle(this.addAuthHeaderToAllowedOrigin(req));
    }
    return next.handle(req);
  }

  private addAuthHeaderToAllowedOrigin(request: HttpRequest<any>): HttpRequest<any> {
    let req = request;

    const authToken = localStorage.getItem('token');
    req = request.clone({ setHeaders: { 'Authorization': `${authToken}` } });
    return req;
  }

}