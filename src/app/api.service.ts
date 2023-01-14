import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

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


  getSupplier(token: string): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${environment.url}suppliers/?token=${token}`);
  }

  getSuppliers(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}suppliers/`)
      .pipe(map(result=>result.result));;
  }


  getCustomer(email: string): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${environment.url}customers/?email=${email}`); 
  }

  getCustomers(): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.url}customers`)
      .pipe(map(result=>result.result));
  }


  

}
