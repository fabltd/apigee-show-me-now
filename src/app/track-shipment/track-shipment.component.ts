import { ShipmentService } from './../shipments/shipment.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-shipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-shipment.component.html',
  styleUrls: ['./track-shipment.component.css']
})
export class TrackShipmentComponent implements OnInit {

errorMessage = '';
trackingNumber = '';
shipment?: any; 
counter = [0,1,2,3];
steps = ["Picked up", "In Transit", "Out For Delivery", "Arrived"];

constructor(private shipmentService: ShipmentService, 
  private route: ActivatedRoute) {}


ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.shipmentService.getShipment(id)
    .subscribe(shipment => {
      this.shipment = shipment;
      this.trackingNumber = id;
      if(!this.shipment?.ShipmentDate) {
        this.errorMessage = "shipment does not exist";
        this.shipment = null;
      }
    });
  }
}

convertTimestamp(timestamp: any): Date {
  if (timestamp._seconds) {
    return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
  }
  const obj = timestamp[Object.getOwnPropertyNames(timestamp)[0]];
  return new Date(obj._seconds * 1000 + obj._nanoseconds / 1000000);
}

submit() {
  this.shipmentService.getShipment(this.trackingNumber)
  .subscribe(shipment => {
    this.shipment = shipment;
    if(!this.shipment?.ShipmentDate) {
      this.errorMessage = "shipment does not exist";
      this.shipment = null;
    }
  });
}





}
