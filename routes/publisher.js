const express = require('express');
const router = express.Router();
const PublisherModel = require('../model/publisher');

// get all publishers(read)
router.get('/',  async (req, res) => {
    try{
        const publishers = await PublisherModel.find({});
        console.log(publishers + " publishers");
        res.send({"result":publishers});
    } catch (err) {
        res.send({ "error":"this is an error message" });
    }
})

// get a single publisher by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const publisher = await PublisherModel.findById(id);

        console.log(publisher + " publisher");
          res.send({ "result": publisher });
    } catch (err) {
        res.send({"Error": "This is some error"});
    }
})

// (Create) a new book
router.post("/", async (req, res) => {
    try{
        const { name, address, isActive } = req.body;

        const newPublisher = {
            "name": name,
            "address": address,
            "isActive": isActive
        }

        const publisher = new PublisherModel(newPublisher);
        const response = await publisher.save();
        res.send({"message": `Successfully created! ${response}`})
    } catch(err){
        res.send({"Error": "This is some error"});
    }
});

// (updated) Update the book with provided id
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
    // console.log(id + " id")
    const { name, address, isActive } = req.body;

        const newPublisher = {
            "name": name,
            "address": address,
            "isActive": isActive
        }

        const response = await PublisherModel.findByIdAndUpdate(
            id,
            { $set: newPublisher },
            { new: true, runValidators: true }
        );

    // const q = req.query.q;
    // const token = req.headers.token;
    res.send({ "message": "Successfully updated! " + response })
    }catch(err){
        res.send({"Error": "This is some error"});
    }
});

// (Deleted) the book that matches the provided id
router.delete("/:id", async (req, res) => {
try{
     const id = req.params.id;
    const response = await PublisherModel.findByIdAndDelete(id);
    res.send({ "message": `Successfully Deleted! ${response}` })
}catch(err){
    res.send({"Error":"This is some error"});
}
   
});

module.exports = router;