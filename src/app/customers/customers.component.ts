import { ApiService } from './../api.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private api: ApiService) {}

  customers$!: Observable<any[]>; 

  ngOnInit() {
    this.customers$ = this.api.getCustomers();
  }

  trackCustomer(i: number, customer: any): number {
    return customer.Email;
  }

}
