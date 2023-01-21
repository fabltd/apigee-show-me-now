import { Route } from "@angular/router";
import { AddSupplierComponent } from "./add-supplier/add-supplier.component";
import { AssignCustomerComponent } from "./assign-customer/assign-customer.component";
import { DeleteSupplierComponent } from "./delete-supplier/delete-supplier.component";
import { FindSupplierComponent } from "./find-supplier/find-supplier.component";


// In admin/routes.ts:
export const SUPPLIER_ROUTES: Route[] =  [
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
  ];