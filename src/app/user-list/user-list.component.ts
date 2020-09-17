import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppUser } from '../_modal/app-user';
import { MyHttpService } from './../_services/my-http.service';

@Component({templateUrl: './user-list.component.html'})
export class UserListComponent implements OnInit {

  users: Observable<AppUser[]>;
  selectedUser: AppUser;
  
  constructor(private httpService: MyHttpService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.reloadData();
    // let newURL = this.route.snapshot.routeConfig.path;
  }

  reloadData() {
    this.httpService.getUserList()
        .subscribe(data => this.users = data.users);
  }

  addUser(){
    this.router.navigate(['user-add']);
  }
  updateUser(id: number){
    this.router.navigate(['user-update', id]);
  }
  deleteUser(id: number) {
    this.httpService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  userDetails(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.selectedUser = user;
   }

}
