# Show Me Now

This project is a demonstration application for the Apigee-X course. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

# Possible REST Method calls:

## Before authentication:

1. GET: Track My Package / "Get Progress"  
    1. Shipments with ascending progress steps:
        1. ZZBeDAmA9HQFOZHsJVwD
        1. c4oblvmjQbQeozmrrw5N
        1. lDvb2Pbyi1ESWecFuRQK
        1. lFCuqiRwVrq4cOy9goGp
        1. caZEwwRy5eIbttKbB3th

## After  authentication:

1. Shipments
    1. POST: Create / "Get Customers List" / **"Add Shipment"**
    1. GET: Set Progress / **"Get Progress"**
    1. PATCH: Set Progress / "Get Progress"/  **"Set Complete"** 
        1. Shipments with ascending progress steps:
            1. ZZBeDAmA9HQFOZHsJVwD
            1. c4oblvmjQbQeozmrrw5N
            1. lDvb2Pbyi1ESWecFuRQK
            1. lFCuqiRwVrq4cOy9goGp
            1. caZEwwRy5eIbttKbB3th

1. Suppliers
    1. GET: Find / **"Get Supplier"**
    1. POST: Add / **"Add Supplier"** 
    1. PUT: Add / **"Update Supplier"** 
    1. PATCH: Assign Customer /  **"Add Customer"** 
    1. DELETE: Find / "delete" / **"Confirm Delete"** 

1. Customers
    1. GET: Find / **"Get Customer"**
        1. PUT: Find / "Get Customer" / "edit" / **"Update Customer"** 
        1. DELETE: Find / "delete" / **"Confirm Delete"** 
    1. POST: Add / **"Add Customer"** 
