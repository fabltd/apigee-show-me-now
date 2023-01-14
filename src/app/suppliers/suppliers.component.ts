import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  constructor(private api: ApiService) {}

  suppliers$!: Observable<any[]>; 

  ngOnInit() {
    this.suppliers$ = this.api.getSuppliers();
  }

  trackSupplier(i: number, supplier: any): number {
    return supplier.id;
  }
}
