import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem("JWT") != null){
      const authReq = req.clone({
        headers: new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem("JWT")}`
        })
    });
    return next.handle(authReq)
    }
  return next.handle(req);
  }
}
