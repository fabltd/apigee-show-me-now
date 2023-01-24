import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user? = '';
  bearerToken = '';
  firebaseApp: firebase.app.App;
  firebaseAuth: firebase.auth.Auth;

  constructor(private httpClient: HttpClient) { 
      this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
      this.firebaseAuth = this.firebaseApp.auth();

    }

// authentication
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    (this.firebaseAuth.signInWithPopup(provider))
    .then(ret => {
      this.firebaseAuth.currentUser?.getIdToken(true).then((idToken) => {
          this.bearerToken = idToken;
          if (this.firebaseAuth.currentUser?.displayName) {
            this.user =  this.firebaseAuth.currentUser.displayName;
          }
        });
      });
  }


  logout() {
    this.firebaseAuth.signOut().then((result) => {
      this.bearerToken = '';
    });
  }

  private getAuthorizedHeaders() {
    return { headers: new HttpHeaders({
      // 'content-type': 'application/json',
      apikey: environment.key,
      Authorization: 'Bearer ' + this.bearerToken
    }) }

  }



// shipments

  getShipment(token: string): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}shipments?id=${token}`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }

  getShipments(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}shipments`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }

  addShipment(shipment: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}shipments`, shipment, this.getAuthorizedHeaders());
  }

  modifyShipment(shipment: any): Observable<any> {
    return this.httpClient.patch<any>(`${environment.url}shipments`, shipment, this.getAuthorizedHeaders());
  }


// suppliers

  getSupplier(id: string): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}suppliers?id=${id}`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }

  getSuppliers(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}suppliers`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }

  addSupplier(supplier: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}suppliers`, supplier, this.getAuthorizedHeaders());
  }

  updateSupplier(supplier: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.url}suppliers`, supplier, this.getAuthorizedHeaders());
  }

  modifySupplier(supplier: any): Observable<any> {
    return this.httpClient.patch<any>(`${environment.url}suppliers`, supplier, this.getAuthorizedHeaders());
  }

  deleteSupplier(id: string): Observable<any[]> {
    return this.httpClient
      .delete<any>(`${environment.url}suppliers?id=${id}`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }




  // customers

  getCustomer(email: string): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}customers?email=${email}`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }

  getCustomers(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}customers`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }

  addCustomer(customer: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}customers`, customer, this.getAuthorizedHeaders());
  }

  updateCustomer(customer: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.url}customers`, customer, this.getAuthorizedHeaders());
  }

  modifyCustomer(customer: any): Observable<any> {
    return this.httpClient.patch<any>(`${environment.url}customers`, customer, this.getAuthorizedHeaders());
  }

  deleteCustomer(email: string): Observable<any[]> {
    return this.httpClient
      .delete<any>(`${environment.url}customers?email=${email}`, this.getAuthorizedHeaders())
      .pipe(map(result=>result.result));
  }


  

}
