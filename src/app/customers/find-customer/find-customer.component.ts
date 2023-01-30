import { ApiService } from './../../api.service';
import { DisplayCustomerComponent } from './../display-customer/display-customer.component';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-find-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DisplayCustomerComponent],
  templateUrl: './find-customer.component.html',
  styleUrls: ['./find-customer.component.css']
})
export class FindCustomerComponent implements OnInit {

  email = '';
  customer?: any;
  errorMessage = '';

  constructor(protected customerServices: CustomerService,
    private api: ApiService) { }

  ngOnInit(): void {
    if(!this.api.email?.includes('qwiklabs')){
      this.email = this.api.email?.slice() || '';
    }
  }

  submit() {
    this.errorMessage = '';
    this.customerServices.getCustomer(this.email)
      .pipe(catchError(err => {
        this.showError(err);
        return of([]);
      }))
      .subscribe(customer => {
        this.customer = customer;
        if(!this.customer.FirstName) {
          this.errorMessage = "customer does not exist";
          this.customer = null;
        }
      });
  }

  trackCustomer(i: number, customer: any): number {
    return customer.Email;
  }

  showError(error: any): void {
    this.errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        'Server error';
  }

}
