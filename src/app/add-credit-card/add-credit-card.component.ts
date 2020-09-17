import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  
import { first } from 'rxjs/operators';

import { AlertService, } from '../_alert/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MyHttpService } from './../_services/my-http.service';

@Component({
  selector: 'add-credit-card',
  templateUrl: './add-credit-card.component.html',
  styleUrls: ['./add-credit-card.component.css']
})
export class AddCreditCardComponent implements OnInit {
  title = 'Card Payment Page';
  cardForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private httpService: MyHttpService
  ) {  }

  ngOnInit() {
    this.userId = this.authService.currentUserValue.id;
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.cardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(12)]],
      expiryMonth: ['', [Validators.required, Validators.minLength(2)]],
      expiryYear: ['', [Validators.required, Validators.minLength(2)]],
      cvv2: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.cardForm.controls; }

  onSubmit() {
    let cardDetails = this.cardForm.value;
    cardDetails.userId = this.userId;
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.cardForm.invalid) {
        return;
    }
    this.loading = true;
    this.httpService.addCreditCard(cardDetails)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(JSON.stringify(data));
          if(data['status'] === 1){
            this.alertService.success('Credit card added successfully', true);
            this.router.navigate([this.returnUrl]);
          }else{
            this.alertService.error(data['message']);
          }
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
