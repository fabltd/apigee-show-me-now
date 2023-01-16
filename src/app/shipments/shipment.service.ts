import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private api: ApiService) { }

  getShipment(id: string): Observable<any> {
    return this.api.getShipment(id)
      .pipe(map(result => result[0]));
  }


  addShipment(shipment: any): Observable<any> {
    return this.api.addShipment(shipment);
  }

  modifyShipment(shipment: any): Observable<any> {
    return this.api.modifyShipment(shipment);
  }

}
