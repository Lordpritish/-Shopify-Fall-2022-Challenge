require('dotenv').config()

const { json, urlencoded } = require("body-parser")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000;

const { InventoryRoutes, ShipmentRoutes } = require("./routes");


app.use(json()) // for parsing application/json
app.use(urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/api/inventory', InventoryRoutes);
app.use('/api/shipment', ShipmentRoutes);

app.listen(port, () => console.log(`Listening on port ${port}..`));



