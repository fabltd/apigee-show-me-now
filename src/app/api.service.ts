import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// TODO
// add API key (and in environment file)
// add Authentication
// add Bearer header


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

// shipments

  getShipment(token: string): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}shipments/?id=${token}`)
      .pipe(map(result=>result.result));
  }

  getShipments(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}shipments/`)
      .pipe(map(result=>result.result));
  }

  addShipment(shipment: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}shipments`, shipment);
  }

  modifyShipment(shipment: any): Observable<any> {
    return this.httpClient.patch<any>(`${environment.url}shipments`, shipment);
  }


// suppliers

  getSupplier(id: string): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}suppliers/?id=${id}`)
      .pipe(map(result=>result.result));
  }

  getSuppliers(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}suppliers/`)
      .pipe(map(result=>result.result));
  }

  addSupplier(supplier: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}suppliers`, supplier);
  }

  updateSupplier(supplier: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.url}suppliers`, supplier);
  }

  modifySupplier(supplier: any): Observable<any> {
    return this.httpClient.patch<any>(`${environment.url}suppliers`, supplier);
  }

  deleteSupplier(id: string): Observable<any[]> {
    return this.httpClient
      .delete<any>(`${environment.url}suppliers/?id=${id}`)
      .pipe(map(result=>result.result));
  }




  // customers

  getCustomer(email: string): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}customers/?email=${email}`)
      .pipe(map(result=>result.result));
  }

  getCustomers(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}customers`)
      .pipe(map(result=>result.result));
  }

  addCustomer(customer: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}customers`, customer);
  }

  updateCustomer(customer: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.url}customers`, customer);
  }

  modifyCustomer(customer: any): Observable<any> {
    return this.httpClient.patch<any>(`${environment.url}customers`, customer);
  }

  deleteCustomer(email: string): Observable<any[]> {
    return this.httpClient
      .delete<any>(`${environment.url}customers/?email=${email}`)
      .pipe(map(result=>result.result));
  }


  

}
