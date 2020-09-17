import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  
import { first } from 'rxjs/operators';

import { AlertService, } from './../_alert/alert.service';
import { AuthenticationService } from './../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login Page';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUser) {
        this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.authService.login(this.f.emailId.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          // console.log(this.returnUrl);
          if(data.status === 1){
            this.router.navigate([this.returnUrl]);
          }else{
            this.alertService.error(data.message);
            // this.loginForm.reset({});
          }
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
