import { ApiService } from './api.service';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Component, Renderer2, OnInit } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
import { CommonModule } from '@angular/common';
import { ScriptService } from "./scriptLoader";
import { environment } from 'src/environments/environment';

const SCRIPT_PATH = 'https://www.google.com/recaptcha/enterprise.js?render=' + environment.recaptcha;
declare let grecaptcha: any;

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomersComponent, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'show-me-now';

  constructor(protected api: ApiService,
    private renderer: Renderer2,
    private scriptService: ScriptService) {
  }

  login() {
    this.api.login();
  }

  logout() {
    this.api.logout();
  }

  ngOnInit(): void {
    if (environment.recaptcha) {
      const scriptElement = this.scriptService.loadJsScript(this.renderer, SCRIPT_PATH);
      scriptElement.onload = () => {
        console.log('Google Recaptcha Script loaded');
        this.api.setGrecaptcha(grecaptcha);
      }
      scriptElement.onerror = () => {
        console.log('Could not load the Google Script!');
      }
    }

  }


}
