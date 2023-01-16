import { ShipmentService } from './../shipment.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-shipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-shipment.component.html',
  styleUrls: ['./edit-shipment.component.css']
})
export class EditShipmentComponent {

  errorMessage = '';
  trackingNumber = '';
  shipment?: any;
  counter = [0, 1, 2, 3];
  steps = ["Picked up", "In Transit", "Out For Delivery", "Arrived"];

  constructor(private shipmentService: ShipmentService,
    private router: Router,  private route: ActivatedRoute) { }

  convertTimestamp(timestamp: any): Date {
    if (timestamp._seconds) {
      return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
    }
    const obj = timestamp[Object.getOwnPropertyNames(timestamp)[0]];
    return new Date(obj._seconds * 1000 + obj._nanoseconds / 1000000);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.trackingNumber = id;
      this.shipmentService.getShipment(id)
      .subscribe(shipment => {
        this.shipment = shipment;
        if(!this.shipment?.ShipmentDate) {
          this.errorMessage = "shipment does not exist";
          this.shipment = null;
        }
      });
    }
  }
  

  submit() {
    this.shipmentService.getShipment(this.trackingNumber)
      .subscribe(shipment => {
        this.shipment = shipment;
        if (!this.shipment?.ShipmentDate) {
          this.errorMessage = "shipment does not exist";
          this.shipment = null;
        }
      });
  }

  setStageComplete() {
    // stage is added on server, so just call it
    this.shipmentService.modifyShipment(this.shipment)
    .pipe(catchError(err => {
      this.showError(err);
      return of({});
    })).subscribe(msg => {
      console.log(msg);
      this.router.navigate(['/progress', this.shipment.id]);
    });
    console.log(this.shipment);
  }

  showError(error: any): void {
    this.errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` :
        'Server error';
  }


  trackShipment(i: number, shipment: any): number {
    return shipment.id;
  }
}
