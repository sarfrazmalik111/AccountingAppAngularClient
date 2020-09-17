import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from './../_alert/alert.service';
import { AuthenticationService } from './../_services/authentication.service';
import { MyHttpService } from './../_services/my-http.service';

@Component({ templateUrl: 'user-add.component.html' })
export class UserAddComponent implements OnInit {
    id: number;
    userForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
        private router: Router, private alertService: AlertService,
        private httpService: MyHttpService, private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        if(this.id){
            this.httpService.getUserDetails(this.id)
                .subscribe(data => {
                    this.userForm.patchValue({
                        id: data.id,
                        userName: data.userName,
                        emailId: data.emailId,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        password: data.password,
                        confirmPassword: data.password
                    });
                }, error => console.log(error));
        }

        this.userForm = this.formBuilder.group({
            id: [''],
            userName: ['', [Validators.required, Validators.minLength(3)]],
            emailId: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.pattern('\\+\\d{12}')]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
        }, {validator: this.checkPasswords });
    }

    checkPasswords(formGroup: FormGroup) { // here we have the 'passwords' group
        const password = formGroup.controls['password'];
        const confirmPassword = formGroup.controls['confirmPassword'];
        if (confirmPassword.errors && !confirmPassword.errors.confirmedValidator) {
            return;
        }
        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ confirmedValidator: true });
        } else {
            confirmPassword.setErrors(null);
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        // stop here if form is invalid
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        this.httpService.saveUserDetails(this.userForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data['status'] === 0 && data['HttpStatus'] === 'FORBIDDEN'){
                        this.authService.logout();
                        this.alertService.error('Session expired');
                        this.router.navigate(['/login']);
                    }else if(data['status'] === 1){
                        this.alertService.success('User Registred successful', true);
                        this.router.navigate(['/users']);
                    }else{
                        this.alertService.error(data['message']);
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