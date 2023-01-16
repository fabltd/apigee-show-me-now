import { DeleteCustomerComponent } from './app/customers/delete-customer/delete-customer.component';
import { AddCustomerComponent } from './app/customers/add-customer/add-customer.component';
import { FindCustomerComponent } from './app/customers/find-customer/find-customer.component';
import { TrackShipmentComponent } from './app/track-shipment/track-shipment.component';
import { ShipmentsComponent } from './app/shipments/shipments.component';
import { SuppliersComponent } from './app/suppliers/suppliers.component';
import { CustomersComponent } from './app/customers/customers.component';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { FindSupplierComponent } from './app/suppliers/find-supplier/find-supplier.component';
import { AddSupplierComponent } from './app/suppliers/add-supplier/add-supplier.component';
import { DeleteSupplierComponent } from './app/suppliers/delete-supplier/delete-supplier.component';
import { AssignCustomerComponent } from './app/suppliers/assign-customer/assign-customer.component';

const routes: Routes = [
  {
    path: '',
    component: TrackShipmentComponent
},
{
  path: 'shipments',
  component: ShipmentsComponent
},
{
  path: 'suppliers',
  component: SuppliersComponent,    
  children: [
    {
      path: '', 
      component: FindSupplierComponent, 
    },
    {
      path: 'edit/:id',
      component: AddSupplierComponent, 
    },
    {
      path: 'assign/:id',
      component: AssignCustomerComponent, 
    },
    {
      path: 'add',
      component: AddSupplierComponent, 
    },
    {
      path: 'delete/:email',
      component: DeleteSupplierComponent, 
    },
  ]
},
{
  path: 'customers',
  component: CustomersComponent,    
  children: [
    {
      path: '', 
      component: FindCustomerComponent, 
    },
    {
      path: 'edit/:email',
      component: AddCustomerComponent, 
    },
    {
      path: 'add',
      component: AddCustomerComponent, 
    },
    {
      path: 'delete/:email',
      component: DeleteCustomerComponent, 
    },
  ],
},
{
  path: 'progress',
  component: TrackShipmentComponent
},
{ 
  path: '**', 
  component: TrackShipmentComponent 
}
];




bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
