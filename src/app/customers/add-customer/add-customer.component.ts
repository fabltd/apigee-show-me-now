import { CustomerService } from './../customer.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  errorMessage = '';
  customer: any = {
    FirstName: '',
    LastName: '',
    Email: '',
    StreetAddress: '',
    Address2: '',
    StateOrProvince: '',
    PostalCode: '',
    Country: ''
  }
  email = '';
  add = true;

  constructor(private customerService: CustomerService,
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('email');
    if (id) {
      // we're editing an existing
      this.add = false;
      this.email = id;
      this.customerService.getCustomer(this.email)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        }))
        .subscribe(customer => {
          this.customer.Email = customer.Email;
          this.customer.FirstName = customer.FirstName;
          this.customer.LastName = customer.LastName;
          this.customer.StreetAddress = customer.StreetAddress;
          this.customer.Address2 = customer.Address2;
          this.customer.StateOrProvince = customer.StateOrProvince;
          this.customer.PostalCode = customer.PostalCode;
          this.customer.Country = customer.Country;
        });
    }
    else {
      // we're adding a new one
      this.add = true;
    }
  }

  submit(): void {
    if(this.add) {
      this.customerService.addCustomer(this.customer)
      .pipe(catchError(err => {
        this.showError(err);
        return of({});
      })).subscribe(msg => {
        console.log(msg);
        this.router.navigate(['customer', 'add', this.customer.Email]);
      });
    }
    else {
      this.customerService.updateCustomer(this.customer)
      .pipe(catchError(err => {
        this.showError(err);
        return of({});
      })).subscribe(msg => {
        console.log(msg);
        this.router.navigate(['customers']);
      });
    }
  }

  showError(error: any): void {
    this.errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        'Server error';
  }
}
