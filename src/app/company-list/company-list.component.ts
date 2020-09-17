import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Company } from '../_modal/company';
import { MyHttpService } from './../_services/my-http.service';

@Component({templateUrl: './company-list.component.html'})
export class CompanyListComponent implements OnInit {

  companies: Observable<Company[]>;
  selectedCompany: Company;

  constructor(private httpService: MyHttpService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.httpService.getCompanyList()
        .subscribe(data => this.companies = data.companies);
  }

  addCompany(){
    this.router.navigate(['company-add']);
  }
  updateCompany(id: number){
    this.router.navigate(['company-update', id]);
  }
  deleteCompany(id: number) {
    this.httpService.deleteCompany(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  companyDetails(targetModal, company) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.selectedCompany = company;
   }

}
