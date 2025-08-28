const express = require('express');
const router = express.Router();
const BookModel = require("../model/book");

// Get all books(Read)
router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find({});

        console.log(books + " books");
        res.send({ "result": books });
    } catch (err) {
        res.send({"Error": "This is some error"});
    }
});

// Get book that matches provided id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const books = await BookModel.findById(id).exec();

        console.log(books + " books");
        res.send({ "result": books });
    } catch (err) {
        res.send({"Error": "This is some error"});
    }
});

// (Create) a new book
router.post("/", async (req, res) => {
    try{
        const { title, pages, price, published_year, language } = req.body;

        const newBook = {
            "title": title,
            "pages": pages,
            "price": price,
            "published_year": published_year,
            "language": language
        }
         
        const Books = new BookModel(newBook);
        const response = await Books.save();
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
    const { title, pages, price, published_year, language } = req.body;

        const newBook = {
            "title": title,
            "pages": pages,
            "price": price,
            "published_year": published_year,
            "language": language
        }

        const response = await BookModel.findByIdAndUpdate(
            id,
            { $set: newBook },
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
    const response = await BookModel.findByIdAndDelete(id);
    res.send({ "message": `Successfully Deleted! ${response}` })
}catch(err){
    res.send({"Error":"This is some error"});
}
   
});

module.exports = router;