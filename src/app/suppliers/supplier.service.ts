
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  suppliers$!: Observable<any[]>; 

  constructor(private api: ApiService) { }

  getSupplier(id: string) : Observable<any> {
    return this.api.getSupplier(id)
    .pipe(map(result=>result[0]));
  }

  getSuppliers() : void {
    this.suppliers$ = this.api.getSuppliers();
  }

  addSupplier(supplier:any): Observable<any> {
   return this.api.addSupplier(supplier);
  }

  updateSupplier(supplier:any): Observable<any> {
    return  this.api.updateSupplier(supplier);
   }


  modifySupplier(supplier:any): Observable<any> {
    return  this.api.modifySupplier(supplier);
   }


  deleteSupplier(id: string) : Observable<any> {
    return this.api.deleteSupplier(id);
  }


}
