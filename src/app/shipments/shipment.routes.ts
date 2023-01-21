import { Route } from "@angular/router";
import { AddShipmentComponent } from "./add-shipment/add-shipment.component";
import { EditShipmentComponent } from "./edit-shipment/edit-shipment.component";


// In admin/routes.ts:
export const SHIPMENT_ROUTES: Route[] =  [
        {
          path: '', 
          component: AddShipmentComponent, 
        },
        {
          path: 'modify',
          component: EditShipmentComponent, 
        },
        {
          path: 'modify/:id',
          component: EditShipmentComponent, 
        }
  ];