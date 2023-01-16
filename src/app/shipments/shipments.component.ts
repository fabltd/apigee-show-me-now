import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {

  constructor(private api: ApiService) {}

  shipments$!: Observable<any[]>; 

  ngOnInit() {
    this.shipments$ = this.api.getShipments();
  }

  trackShipment(i: number, shipment: any): number {
    return shipment.id;
  }
}
