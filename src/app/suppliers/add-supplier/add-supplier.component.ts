import { SupplierService } from './../supplier.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {

  errorMessage = '';
  supplier: any = {
    id: '',
    Info: {
        Name: ''
    },
    Customers: [],
    Address: {
        PostalCode: '',
        Country: '',
        Address2: '',
        StreetAddress: '',
        StateOrProvince: ''
    }
}
  id = '';
  add = true;

  constructor(private supplierService: SupplierService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // we're editing an existing
      this.add = false;
      this.id = id;
      this.supplierService.getSupplier(this.id)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        }))
        .subscribe(supplier => {
          this.supplier.id = supplier.id;
          this.supplier.Info.Name = supplier.Info.Name;
          this.supplier.Address.StreetAddress = supplier.Address.StreetAddress;
          this.supplier.Address.Address2 = supplier.Address.Address2;
          this.supplier.Address.StateOrProvince = supplier.Address.StateOrProvince;
          this.supplier.Address.PostalCode = supplier.Address.PostalCode;
          this.supplier.Address.Country = supplier.Address.Country;
          this.supplier.Customers = supplier.Customers;
        });
    }
    else {
      // we're adding a new one
      this.add = true;
    }
  }

  deleteCustomer(customer: string) {
    this.supplier.Customers = this.supplier.Customers.filter((c:string ) => {return c !== customer});
  }

  submit(): void {
    if (this.add) {
      delete this.supplier.id;  //remove empty id - set on server
      this.supplierService.addSupplier(this.supplier)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        })).subscribe(msg => {
          console.log(msg);
          this.router.navigate(['suppliers', 'edit', msg.id]);
        });
    }
    else {
      this.supplierService.updateSupplier(this.supplier)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        })).subscribe(msg => {
          console.log(msg);
          this.router.navigate(['suppliers']);
        });
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
