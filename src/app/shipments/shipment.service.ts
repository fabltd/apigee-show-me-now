import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private api: ApiService) { }

  addShipment(shipment:any): Observable<any> {
    return this.api.addShipment(shipment);
   }

}
