
const express = require("express")
const router = express.Router()
const { ShipmentController } = require('../controllers')

router.post('/create', ShipmentController.create_shipment)
router.put('/assign', ShipmentController.assign_inventory)
router.get('/view', ShipmentController.view_shipments)
router.delete('/delete', ShipmentController.delete_shipment)

module.exports = router;