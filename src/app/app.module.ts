import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertService } from './_alert/alert.service';
import { AlertComponent } from './_alert/alert.component';
// import { fakeBackendProvider } from './_helpers/fake-backend';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AuthGuard } from './_helpers/auth.guard';
import { MyHttpService } from './_services/my-http.service';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddCreditCardComponent } from './add-credit-card/add-credit-card.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyListComponent } from './company-list/company-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    UserAddComponent,
    UserDetailsComponent,
    UserListComponent,
    AddCreditCardComponent,
    CompanyAddComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlimLoadingBarModule,
    NgbModule
  ],
  providers: [
    MyHttpService,
    AlertService,
    JwtInterceptor,
    AuthGuard,
    // fakeBackendProvider, // provider used to create fake backend
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
