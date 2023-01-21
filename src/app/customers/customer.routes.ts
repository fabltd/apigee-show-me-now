import { Route } from "@angular/router";
import { AddCustomerComponent } from "./add-customer/add-customer.component";
import { DeleteCustomerComponent } from "./delete-customer/delete-customer.component";
import { FindCustomerComponent } from "./find-customer/find-customer.component";

// In admin/routes.ts:
export const CUSTOMER_ROUTES: Route[] =   [
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
  ];