import { TrackShipmentComponent } from './app/track-shipment/track-shipment.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';

const routes: Routes = [
{
  path: 'shipments', 
  loadChildren: () => import('./app/shipments/shipment.routes').then(mod => mod.SHIPMENT_ROUTES)
},
{
  path: 'suppliers', 
  loadChildren: () => import('./app/suppliers/supplier.routes').then(mod => mod.SUPPLIER_ROUTES)
},
{
  path: 'customers', 
  loadChildren: () => import('./app/customers/customer.routes').then(mod => mod.CUSTOMER_ROUTES)
},
{
  path: 'progress/:id',
  component: TrackShipmentComponent
},
{
  path: '',
  component: TrackShipmentComponent
},
{ 
  path: '**', 
  component: TrackShipmentComponent 
}
];


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig)
    )
    
  ]
}).catch(err => console.error(err));


