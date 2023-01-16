import { DisplaySupplierComponent } from './../display-supplier/display-supplier.component';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../supplier.service';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-find-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DisplaySupplierComponent],
  templateUrl: './find-supplier.component.html',
  styleUrls: ['./find-supplier.component.css']
})
export class FindSupplierComponent {

  id = '';
  supplier?: any;
  errorMessage = '';

  constructor(protected supplierServices: SupplierService) { }

  submit() {
    this.errorMessage = '';
    this.supplierServices.getSupplier(this.id)
      .pipe(catchError(err => {
        this.showError(err);
        return of([]);
      }))
      .subscribe(supplier => {
        this.supplier = supplier;
        if(!this.supplier?.Info?.Name) {
          this.errorMessage = "supplier does not exist";
          this.supplier = null;
        }
      });
  }

  trackSupplier(i: number, supplier: any): number {
    return supplier.Email;
  }

  showError(error: any): void {
    this.errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        'Server error';
  }

}
