import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-supplier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-supplier.component.html',
  styleUrls: ['./display-supplier.component.css']
})
export class DisplaySupplierComponent {

@Input() supplier?: any;

trackCustomer(i: number): number {
  return i;
}

}
