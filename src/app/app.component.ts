import { ApiService } from './api.service';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule, RouterOutlet, CustomersComponent, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'show-me-now';
  constructor(protected api: ApiService) {
  }
  login() {
    this.api.login();
  }
  logout() {
    this.api.logout();
  }
}
