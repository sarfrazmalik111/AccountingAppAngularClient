import { Company } from '../_modal/company';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppUser } from '../_modal/app-user';
import { CreditCard } from '../_modal/credit-card';
import { GlobalConstants } from '../globalConstants';

@Injectable({providedIn: 'root'})
export class MyHttpService {
  constructor(private http: HttpClient) { }

  testCall(): Observable<any> {
    return this.http.get(`${GlobalConstants.apiURL}/users`);
  }

  getUserList(): Observable<any> {
    return this.http.get(`${GlobalConstants.apiURL}/users`);
  }
  getUserDetails(id: number): Observable<any> {
    return this.http.get(`${GlobalConstants.apiURL}/users/find/${id}`);
  }
  saveUserDetails(user: AppUser) {
    return this.http.post(`${GlobalConstants.apiURL}/users/save-user`, user);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${GlobalConstants.apiURL}/users/delete/${id}`, { responseType: 'text' });
  }

  getCreditCards(userId: number): Observable<any> {
    return this.http.get<CreditCard[]>(`${GlobalConstants.apiURL}/payment/get-credit-cards/${userId}`);
  }
  addCreditCard(card: CreditCard) {
    return this.http.post(`${GlobalConstants.apiURL}/payment/add-credit-card`, card);
  }
  paymentByCard(userId: number, amount: number) {
    return this.http.post(`${GlobalConstants.apiURL}/payment/payment-by-card`, {userId, amount});
  }

  getCompanyList(): Observable<any> {
    return this.http.get(`${GlobalConstants.apiURL}/companies`);
  }
  saveCompanyDetails(company: Company) {
    return this.http.post(`${GlobalConstants.apiURL}/companies/save`, company);
  }
  getCompanyDetails(id: number): Observable<any> {
    return this.http.get(`${GlobalConstants.apiURL}/companies/find/${id}`);
  }
  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${GlobalConstants.apiURL}/companies/delete/${id}`, { responseType: 'text' });
  }


  // getUsers(): Observable<any> {
  //   return this.http.get(`${GlobalConstants.apiURL}`);
  //   // return this.http.post(`${config.apiUrl}/users/register`, user);
  //   // return this.http.delete(`${config.apiUrl}/users/${id}`);
  //   // return this.http.get<User[]>(`${config.apiUrl}/users`);
  // }
  // addUser(user: Object): Observable<Object> {
  //   return this.http.post(`${GlobalConstants.apiURL}/add`, user);
  // }
  // updateUpdate(user: Object): Observable<Object> {
  //   return this.http.put(`${GlobalConstants.apiURL}/update`, user);
  // }
  // deleteUser(id: number): Observable<any> {
  //   return this.http.delete(`${GlobalConstants.apiURL}/delete/${id}`, { responseType: 'text' });
  // }

}
