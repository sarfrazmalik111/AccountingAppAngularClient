import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Company } from '../_modal/company';
import { MyHttpService } from './../_services/my-http.service';

@Component({ templateUrl: 'company-details.component.html' })
export class CompanyDetailsComponent implements OnInit {

  id: number;
  company: Company;
  isLoginPage: boolean = false;

  constructor(private route: ActivatedRoute,private router: Router,
    private companyService: MyHttpService) { }

  ngOnInit() {
    this.company = new Company();
    this.id = this.route.snapshot.params['id'];

    this.companyService.getCompanyDetails(this.id)
      .subscribe(data => {
        console.log(data)
        this.company = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['companies']);
  }

}
