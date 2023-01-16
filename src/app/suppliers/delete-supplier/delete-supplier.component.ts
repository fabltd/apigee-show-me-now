import { DisplaySupplierComponent } from './../display-supplier/display-supplier.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../supplier.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-delete-supplier',
  standalone: true,
  imports: [CommonModule, DisplaySupplierComponent],
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css']
})
export class DeleteSupplierComponent implements OnInit {

  email = '';
  supplier?: any[];
  errorMessage = '';

  constructor(private route: ActivatedRoute, 
    private router: Router,
    protected supplierService: SupplierService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('email');
    if (id) {
      this.email = id;
      this.supplierService.getSupplier(id)
        .pipe(catchError(err => {
          this.showError(err);
          return of({});
        }))
        .subscribe(supplier => this.supplier = supplier);
    }
  }

  showError(error: any): void {
    this.errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        'Server error';
  }

  submit() {
    this.supplierService.deleteSupplier(this.email)
    .pipe(catchError(err => {
      this.showError(err);
      return of({});
    })).subscribe(msg => {
      console.log(msg);
      this.router.navigate(['suppliers']);
    });
  }

  trackSupplier(i: number, supplier: any): number {
    return supplier.Email;
  }
}
