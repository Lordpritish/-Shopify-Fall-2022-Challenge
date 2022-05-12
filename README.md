# Shopify-Fall-2022-Challenge

## Build an inventory tracking web application for a logistics company with the following features

* Basic CRUD Functionality. You should be able to:
    * Create inventory items
    * Edit Them
    * Delete Them
    * View a list of them

* Along with one additional feature:
    * Ability to create “shipments” and assign inventory to the shipment, and adjust inventory appropriately

# For a video demonstration visit
-  [Youtube Video](https://youtu.be/R3RvUv43U9M)

# Table of Contents
- [Installations to run the application locally](#Installations-to-run-the-application-locally)
- [How to Run it](#How-to-run-it)
- [CRUD Functionality](#CRUD-Functionality)
- [Shipment](#shipment)
- [Future Features](#future-features)
- [Note For Shopify Developers](#note-for-shopify-developers)
- [Contact Me](#contact-me)


<p align="center">
    <u><h2 align="center">Installations to run the application locally</h2></u>
</p>

- First create a Firebase Project
-  Generate an serviceAccountkey for your firebase project. Go to your ```Firebase project -> Project Settings -> Service Accounts``` and download the firebase SDK by clicking ```Generate New Private Key``` button
- Rename the file to ``` serviceAccountKey.json ``` and put it in the root folder. The file will look like this
```
 {
  "type": ,
  "project_id": ,
  "private_key_id": ,
  "private_key": ,
  "client_email": ,
  "client_id": ,
  "auth_uri": ,
  "token_uri": ,
  "auth_provider_x509_cert_url": ,
  "client_x509_cert_url": 
}
```
- To install all the dependencies run 
```bash
npm i
```

<p align="center">
    <u><h2 align="center">How to Run it</h2></u>
</p>

- Run on Replit
  - To run the application on Replit, just go to the following link : https://replit.com/@PritishPanda/Shopify-Fall-2022-Challenge and fork the repo.
  - Once you fork it you can add your own serviceAccountKey.json or you could use mine which already exist in replit and run the app
- Run Locally
  - To run the application locally, start up your terminal /command prompt ,and go to the project folder and then run the following command
```bash
node index.js
```


## Features
<p align="center">
    <u><h2 align="center">CRUD Functionality</h2></u>
</p>


- All the inventry items are stored in the Firebase Database
- Once an inventory item is created an item_id is generated and returned as response
- **Create inventory items** : POST {/api/inventory/add}
   - Sample body request:
   ```
   {
      "item_name" : "hat",
      "quantity" : 9,
      "desc" : "fashion item"
   }
   ```
  - Sample response:
     ```
     {
    "item_id": "zKqeEYJkqsNlUSgbMZ7x"
    }
     ```
   - Sample Postman Request:
    ![Screen Shot 2022-05-10 at 1 06 52 PM](https://user-images.githubusercontent.com/60456975/167696024-e99b708c-7ed2-4cc7-9316-b50152fc4488.png)
    
- **View inventory** : GET {/api/inventory/view}
   - Sample Postman Request:
   ![Screen Shot 2022-05-10 at 1 07 39 PM](https://user-images.githubusercontent.com/60456975/167696082-3d503b02-c604-4f56-9034-d8b8dd07f352.png)


- **Edit inventory item** : PUT {/api/inventory/edit}
  - You have to use the item_id of the  inventory item which we wihs update from the repsone of the create inventory request 
   - Sample body request:
   ```
   {
      "item_id" : $item_id,
      "quantity" : 15,
   }
   ```

   - Sample Postman Request:
   ![Screen Shot 2022-05-10 at 1 08 20 PM](https://user-images.githubusercontent.com/60456975/167696134-44ee7cb2-ed0f-4901-977a-16a00603deac.png)


- **Delete inventory item** : DELETE {/api/inventory/delete/$item_id}
   - In the request url replace $item_name with the item you want to delete from the inventory
   - Sample Request:
   ![Screen Shot 2022-05-10 at 1 09 32 PM](https://user-images.githubusercontent.com/60456975/167696197-db69911e-ee85-42a1-9409-2095ac0c1843.png)



<p align="center">
    <u><h2 align="center">Shipment</h2></u>
</p>

- **Create a Shipment**: POST {/api/shipment/create}
  - Use this endpoint to create/initialize a shipment with basic shipment details
  - After a shipment has been created you can then assign inventory items to it.
  - Once an shipment is created an shipment_id is generated and returned as response which wil be used for later queries
  - Sample body request:
   ```
   {
      "shipment_to" : "India",
      "shipment_from" : "Toronto",
      "courrier_service" : "Canada Post",
      "user_name" : "pritish"
   }
   ```
  - Sample response:
     ```
     {
    "shipment_id": "VYKSeoJntvd0kLEtLXws"
    }
     ```
  - Sample Postamn Request:
   ![Screen Shot 2022-05-10 at 1 38 28 PM](https://user-images.githubusercontent.com/60456975/167696248-64648e3d-3b0e-4fb7-bcb0-4219165c2655.png)

  
- **Assign Inventory items to Shipment** : PUT {/api/shipment/assign}
  -  After a shipment is created you can assign inventory items to it
  - The quantity of the inventory items are adjusted after each assigment and an error will be returned if there is insufficient quantity for the inventory item
  - Sample body request:
   ```
   {
      "shipment_id" : $shipment_id,
      "item_id" : $item_id,
      "qunatity" : 4
   }
   ```
  - Sample Postman Request:
   ![Screen Shot 2022-05-10 at 1 58 53 PM](https://user-images.githubusercontent.com/60456975/167696274-d2028b0a-47d8-4f7d-b4d5-bb82e3ddee8c.png)

- **View all Shipments** : GET {/api/shipment/view}
  - Sample Postman Request:
  ![Screen Shot 2022-05-10 at 1 59 32 PM](https://user-images.githubusercontent.com/60456975/167696347-53d6fa18-d7e7-45f0-9257-dfd75b94cd23.png)


<p align="center">
    <u><h2 align="center">Future Features</h2></u>
</p>

- Make the UI interface for the app
- Update the create inventory request so that it accepts images as well.
-  Add the delete shipment endpoint as well, which involves adjusting the inventory as well


<p align="center">
    <u><h2 align="center">Note for Shopify Developers</h2></u>
</p>

- If required I will migrate to aws or gcp in the future releases.
- Deployment using Repl required subscription, if you find any errors while running the code, please fork the code first and then run it.

<p align="center">
    <u><h2 align="center">Contact Me</h2></u>
</p>

Email : pritish.panda@mail.utoronto.ca

