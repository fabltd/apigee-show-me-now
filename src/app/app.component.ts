import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';

@Component({
  standalone:true,
  imports:[RouterOutlet, CustomersComponent, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'show-me-now';
}
