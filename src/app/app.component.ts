import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { AppUser } from './_modal/app-user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AccountingApp';
  currentUser: AppUser;
  
  constructor(private loadingBar: SlimLoadingBarService, private router: Router, private authService: AuthenticationService) {  
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
