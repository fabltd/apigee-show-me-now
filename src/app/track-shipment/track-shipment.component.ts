import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-track-shipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-shipment.component.html',
  styleUrls: ['./track-shipment.component.css']
})
export class TrackShipmentComponent {

trackingNumber = '';
shipments$!: Observable<any[]>; 
counter = [0,1,2,3];
steps = ["Picked up", "In Transit", "Out For Delivery", "Arrived"];

constructor(private api: ApiService) {}

convertTimestamp(timestamp: any): Date {
  if (timestamp._seconds) {
    return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
  }
  console.log(timestamp[Object.getOwnPropertyNames(timestamp)[0]])
  const obj = timestamp[Object.getOwnPropertyNames(timestamp)[0]];
  return new Date(obj._seconds * 1000 + obj._nanoseconds / 1000000);
}

submit() {
  this.shipments$ = this.api.getShipment(this.trackingNumber);
}




trackShipment(i: number, shipment: any): number {
  return shipment.id;
}

}
