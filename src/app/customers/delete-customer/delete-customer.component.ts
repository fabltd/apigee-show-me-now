import { DisplayCustomerComponent } from './../display-customer/display-customer.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [CommonModule, DisplayCustomerComponent],
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  email = '';
  customer?: any[];
  errorMessage = '';

  constructor(private route: ActivatedRoute, 
    private router: Router,
    protected customerService: CustomerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('email');
    if (id) {
      this.email = id;
      this.customerService.getCustomer(id)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        }))
        .subscribe(customer => this.customer = customer);
    }
  }

  showError(error: any): void {
    this.errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        'Server error';
  }

  submit() {
    this.customerService.deleteCustomer(this.email)
    .pipe(catchError(err => {
      this.showError(err);
      return of({});
    })).subscribe(msg => {
      console.log(msg);
      this.router.navigate(['customers']);
    });
  }

  trackCustomer(i: number, customer: any): number {
    return customer.Email;
  }
}
