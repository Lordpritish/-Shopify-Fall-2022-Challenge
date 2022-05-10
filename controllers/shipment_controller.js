const { db, admin } = require('../firebase_setup/firebase')

const create_shipment = async (req, res) => {

    if (!req.body.shipment_to || !req.body.shipment_from || !req.body.courrier_service || !req.body.user_name)
        return res.status(400).send("There are missing feilds in request body")
    // Add a new document with a generated id.
    const resp = await db.collection('shipments').add({
        user_name: req.body.user_name,
        shipment_from: req.body.shipment_to,
        shipment_to: req.body.shipment_from,
        courrier_service: req.body.courrier_service,
    });

    var temp = JSON.parse('{}')
    const result = { "shipment_id": resp.id }
    return res.status(200).json(result);
}
const get_items = async (id) => {

    var temp_items = JSON.parse('{}')
    const item_snapshot = await db.collection('shipments').doc(id).collection("items").get()
    if (!item_snapshot.empty) {
        item_snapshot.forEach(item => {
            temp_items[item.id] = item.data()
        });
    }
    return temp_items
}


const view_shipments = async (req, res) => {

    var temp = JSON.parse('{}')

    const shipments = db.collection('shipments');
    const snapshot = await shipments.get();
    if (snapshot.empty)
        return res.send("No shipments")
    var count = 0
    var bar = new Promise((resolve, reject) => {
        snapshot.forEach(async (doc) => {
            temp[doc.id] = doc.data()
            await get_items(doc.id).then((result) => {
                temp[doc.id].items = result
            })
            count++;
            if (count == snapshot.docs.length)
                resolve()
        })

    });
    bar.then(() => {
        const result = { "shipments": temp }
        return res.json(result);
    });


}

const assign_inventory = async (req, res) => {

    if (!req.body.shipment_id || !req.body.item_id || !req.body.quantity)
        return res.status(400).send("There are missing feilds in request body")

    const shipments = db.collection('shipments');
    const ship_doc = await shipments.doc(req.body.shipment_id).get();

    if (ship_doc.exists) {
        const inventory = db.collection('inventory');
        const item_doc = await inventory.doc(req.body.item_id).get();
        if (item_doc.exists) {

            const item = item_doc.data()
            if (item.quantity - parseInt(req.body.quantity) >= 0) {
                await inventory.doc(req.body.item_id).update({
                    quantity: item.quantity - parseInt(req.body.quantity)
                });


                try {
                    await shipments.doc(req.body.shipment_id).collection("items").doc(req.body.item_id).update({
                        quantity: admin.firestore.FieldValue.increment(parseInt(req.body.quantity))
                    });
                } catch (error) {
                    await shipments.doc(req.body.shipment_id).collection("items").doc(req.body.item_id).set({
                        quantity: parseInt(req.body.quantity)
                    });
                }
                return res.send("Success")
            }
            else
                return res.status(400).send("insufficient quantity for the inventory item")

        }
        else
            return res.status(404).send("Item not in inventory")
    }
    else
        return res.status(404).send("Shipment doesnt exist")


}

// const delete_shipment = async (req, res) => {

//     const shipment = db.collection('shipments');
//     const doc = await shipment.doc(req.params.shipment_id).get();

//     if (doc.exists) {
//         await db.collection('shipments').doc(req.params.shipment_id).collection("items").dele
//         await db.collection('shipments').doc(req.params.shipment_id).delete();
//         return res.send("Deleted Successfully");
//     }
//     else
//         return res.status(400).send("shipment doesnt exist")
// }

module.exports = {
    create_shipment,
    view_shipments,
    assign_inventory
}