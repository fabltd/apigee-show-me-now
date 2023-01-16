
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers$!: Observable<any[]>; 

  constructor(private api: ApiService) { }

  getCustomer(email: string) : Observable<any> {
    return this.api.getCustomer(email)
    .pipe(map(result=>result[0]));
  }


  getCustomers() : void {
    this.customers$ = this.api.getCustomers();
  }

  addCustomer(customer:any): Observable<any> {
   return this.api.addCustomer(customer);
  }

  updateCustomer(customer:any): Observable<any> {
    return  this.api.updateCustomer(customer);
   }

  deleteCustomer(email: string) : Observable<any> {
    return this.api.deleteCustomer(email);
  }


}
