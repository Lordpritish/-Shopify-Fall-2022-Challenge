
const express = require("express")
const router = express.Router()
const { InventoryController } = require('../controllers')

router.post('/add', InventoryController.inventory_add)

router.get('/view', InventoryController.inventory_view)

router.put('/edit', InventoryController.inventory_update)

router.delete('/delete/:item_id', InventoryController.inventory_delete)

module.exports = router;
