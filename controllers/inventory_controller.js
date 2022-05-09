const { db } = require('../firebase_setup/firebase')

const inventory_add = async (req, res) => {

    const inventory = db.collection('inventory');


    if (!req.body.item_name || !req.body.quantity || !req.body.desc)
        return res.status(400).send("There are missing feilds in request body")

    const item = await inventory.add({
        item_name: req.body.item_name,
        quantity: req.body.quantity,
        description: req.body.desc
    });

    var temp = JSON.parse('{}')
    const result = { "item_id": item.id }
    return res.json(result)
}
const inventory_view = async (req, res) => {

    var temp = JSON.parse('{}')

    const inventory = db.collection('inventory');
    const snapshot = await inventory.get();
    if (snapshot.empty)
        return res.send("Empty inventory")

    snapshot.forEach(doc => {
        temp[doc.id] = doc.data()
    });
    const result = { "items": temp }
    return res.json(result);
}

const inventory_update = async (req, res) => {

    if (!req.body.item_id)
        return res.status(400).send("There are missing feilds in request body")

    const inventory = db.collection('inventory');
    const doc = await inventory.doc(req.body.item_id).get();

    if (doc.exists) {
        if (req.body.quantity) {
            await inventory.doc(req.body.item_id).update({
                quantity: parseInt(req.body.quantity)
            });
        }
        if (req.body.desc) {
            await inventory.doc(req.body.item_id).update({
                description: req.body.desc
            });
        }
        if (req.body.item_name) {
            await inventory.doc(req.body.item_id).update({
                item_name: req.body.item_name
            });
        }
        return res.send("Update successfull")
    }
    else
        return res.status(404).send("Item not in inventory")

}
const inventory_delete = async (req, res) => {

    const inventory = db.collection('inventory');
    const doc = await inventory.doc(req.params.item_id).get();

    if (doc.exists) {
        await db.collection('inventory').doc(req.params.item_id).delete();
        return res.send("Deleted Successfully");
    }
    else
        return res.status(400).send("Item not in inventory")
}

module.exports = {
    inventory_add,
    inventory_delete,
    inventory_update,
    inventory_view
}
