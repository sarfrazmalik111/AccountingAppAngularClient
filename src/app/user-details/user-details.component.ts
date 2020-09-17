import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { AuthenticationService } from './../_services/authentication.service';
import { AppUser } from '../_modal/app-user';
import { CreditCard } from '../_modal/credit-card';
import { MyHttpService } from './../_services/my-http.service';
import { AlertService } from './../_alert/alert.service';

@Component({templateUrl: './user-details.component.html'})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: AppUser;
  creditCards: Observable<CreditCard[]>;
  loading = false;
  submitted = false;
  paymentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
    private httpService: MyHttpService, private alertService: AlertService){ }

  ngOnInit() {
    this.user = this.authService.currentUserValue;

    this.paymentForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });

    this.reloadCards();
  }

  reloadCards() {
    this.httpService.getCreditCards(this.user.id)
        .subscribe(data => this.creditCards = data.creditCards);
  }

  get f() { return this.paymentForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.paymentForm.invalid) {
      return;
    }
    this.loading = true;
    this.httpService.paymentByCard(this.user.id, this.f.amount.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if(data['status'] === 1){
            this.alertService.success(data['message']);
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
