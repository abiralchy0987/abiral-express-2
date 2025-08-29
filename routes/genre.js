const express = require('express');
const router = express.Router();
const Genre = require("../model/genre");

// Get all genre(Read)
router.get('/', async (req, res) => {
    try {
        const genre = await Genre.find({});

        console.log(genre + " genres");
        res.send({ "result": genre });
    } catch (err) {
        res.send({"Error": "This is some error"});
    }
})
// Get genre that matches provided id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const genre = await GenreModel.findById(id).exec();

        console.log(genre + " genre");
        res.send({ "result": genre });
    } catch (err) {
        res.send({"Error": "This is some error"});
    }
});

// (Create) a new book
router.post("/", async (req, res) => {
    try{
        const { title } = req.body;

        const newBook = {
            "title": title,
    
        }

        const genre = new GenreModel(newBook);
        const response = await genre.save();
        res.send({"message": `Successfully created! ${response}`})
    } catch(err){
        res.send({"Error": "This is some error"});
    }
});

// (updated) Update the genre with provided id
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
    // console.log(id + " id")
    const { title} = req.body;

        const newGenre = {
            "title": title
        }

        const response = await GenreModel.findByIdAndUpdate(
            id,
            { $set: newGenre },
            { new: true, runValidators: true }
        );

    // const q = req.query.q;
    // const token = req.headers.token;
    res.send({ "message": "Successfully updated! " + response })
    }catch(err){
        res.send({"Error": "This is some error"});
    }
});

// (Deleted) the genre that matches the provided id
router.delete("/:id", async (req, res) => {
try{
     const id = req.params.id;
    const response = await GenreModel.findByIdAndDelete(id);
    res.send({ "message": `Successfully Deleted! ${response}` })
}catch(err){
    res.send({"Error":"This is some error"});
}
   
});

module.exports = router;