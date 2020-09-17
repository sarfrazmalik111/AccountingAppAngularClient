import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    //custom interceptor to catch all error responses from the server in a single location.
    
    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.accessToken) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${currentUser.accessToken}`}
            });
        }
        return next.handle(request);
    }
}
