import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from './../_alert/alert.service';
import { AuthenticationService } from './../_services/authentication.service';
import { MyHttpService } from './../_services/my-http.service';

@Component({ templateUrl: 'company-add.component.html' })
export class CompanyAddComponent implements OnInit {
    id: number;
    companyForm: FormGroup;
    loading = false;
    submitted = false;
    userId: number;

    constructor(
        private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
        private alertService: AlertService, private authService: AuthenticationService, private httpService: MyHttpService
    ) { }

    ngOnInit() {
        this.userId = this.authService.currentUserValue.id;
        this.id = this.route.snapshot.params['id'];
        if(this.id){
            this.httpService.getCompanyDetails(this.id)
                .subscribe(data => {
                    this.companyForm.patchValue({
                        id: data.id,
                        companyName: data.companyName,
                        address: data.address
                    });
                }, error => console.log(error));
        }

        this.companyForm = this.formBuilder.group({
            id: [''],
            companyName: ['', [Validators.required, Validators.minLength(2)]],
            address: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.companyForm.controls; }

    onSubmit() {
        let companyDetails = this.companyForm.value;
        companyDetails.userId = this.userId;

        this.submitted = true;
        this.alertService.clear();
        if (this.companyForm.invalid) {
            return;
        }
        this.loading = true;
        this.httpService.saveCompanyDetails(companyDetails)
            .pipe(first())
            .subscribe(
                data => {
                    if(data['status'] === 1){
                        this.alertService.success('Company Registred successful', true);
                        this.router.navigate(['/companies']);
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
