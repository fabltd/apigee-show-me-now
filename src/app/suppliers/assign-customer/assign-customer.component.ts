import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from './../supplier.service';
import {  ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-assign-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-customer.component.html',
  styleUrls: ['./assign-customer.component.css']
})
export class AssignCustomerComponent implements OnInit {

  supplier: any = {
    id: '',
    Info: {
        Name: ''
    },
    Customers: [],
}
  errorMessage = '';
  email = '';

  constructor(private supplierService: SupplierService,
   private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supplierService.getSupplier(id)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        }))
        .subscribe((s: any) => {
          this.supplier.id = s.id;
          this.supplier.Info.Name = s.Info.Name;
          this.supplier.Customers = s.Customers;
          console.log(this.supplier);
        });
    }
  }

  submit() {
    if(!this.supplier.Customers.includes(this.email)) {
      if(!this.supplier.Customers) {
        this.supplier.Customers = [];
      }
      this.supplier.Customers.push(this.email);
      this.supplierService.modifySupplier(this.supplier)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        })).subscribe(msg => {
          console.log(msg);
        });
    }
    else {
      this.errorMessage = 'Customer already listed with supplier';
    }
  }

  showError(error: any): void {
    this.errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        'Server error';
  }

  trackCustomer(i: number): number {
    return i;
  }

}
