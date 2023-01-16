import { ShipmentService } from './../shipment.service';
import { ShipmentsComponent } from './../shipments.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from 'src/app/suppliers/supplier.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.css']
})
export class AddShipmentComponent {

  // this needs two fields: one for the supplier,
  // and another that should be a user dropdown
  // that appears once supplier is selected.

  // Then button to allow submission of new shipment
  // which will be timestamped to now

  customerEmail = '';
  id = '';
  supplier: any = {
    Info: { Name: '' },
    Customers: []
  };
  errorMessage = '';

  constructor(protected supplierServices: SupplierService,
    private shipmentService: ShipmentService,
    private router: Router) { }


  getCustomers() {
    this.errorMessage = '';
    this.supplierServices.getSupplier(this.id)
      .pipe(catchError(err => {
        this.showError(err);
        return of([]);
      }))
      .subscribe(supplier => {
        this.supplier = supplier;
        if (!this.supplier?.Info?.Name) {
          this.errorMessage = "supplier does not exist";
        }
      });
  }


  submit() {
    const ship = {
      Customer: this.customerEmail,
      Supplier: this.id
    }
    this.shipmentService.addShipment(ship)
    .pipe(catchError(err => {
      this.showError(err);
      return of({});
    })).subscribe(msg => {
      console.log(msg);
      this.router.navigate(['shipments', 'edit', this.supplier.id]);
    })
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
