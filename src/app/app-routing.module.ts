import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers/auth.guard';
import { AddCreditCardComponent } from './add-credit-card/add-credit-card.component';
import { LoginComponent } from './login/login.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyAddComponent } from './company-add/company-add.component';


const routes: Routes = [
  { path: '', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'user-update/:id', component: UserAddComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: 'company-add', component: CompanyAddComponent },
  { path: 'company-update/:id', component: CompanyAddComponent },
  { path: 'add-card-details', component: AddCreditCardComponent },
  // { path: 'details/:id', component: UserDetailsComponent },
  // { path: 'test', component: EmployeeListComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
