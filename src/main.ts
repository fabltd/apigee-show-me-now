import { TrackShipmentComponent } from './app/track-shipment/track-shipment.component';
import { ShipmentsComponent } from './app/shipments/shipments.component';
import { SuppliersComponent } from './app/suppliers/suppliers.component';
import { CustomersComponent } from './app/customers/customers.component';

import { ApiService } from './app/api.service';
// import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
},
{
  path: 'shipments',
  component: ShipmentsComponent
},
{
  path: 'suppliers',
  component: SuppliersComponent
},
{
  path: 'progress',
  component: TrackShipmentComponent
}
];




bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    provideHttpClient(),
    {provide:ApiService,useClass:ApiService}
  ]
}).catch(err => console.error(err));
