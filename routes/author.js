const express = require('express');
const multer = require('multer')
const router = express.Router();
const path = require("path");
const AuthorModel = require("../model/author");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage: storage });

// Get all authors (Read)
router.get('/', async (req, res) => {
    try {

        const authors = await AuthorModel.find({});
        console.log(authors + " authors");
        res.send({ "result": authors });
    } catch (err) {
        res.send({ "Error": "This is some error" });
    }
});

// Get author by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const author = await AuthorModel.findById(id).exec();
        console.log(author + " author");
        res.send({ "result": author });
    } catch (err) {
        res.send({ "Error": "This is some error" });
    }
});

// Create a new author
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { name, age, country, gender, phone, email } = req.body;
        const image = req.file.filename;

        const newAuthor = {
            "name": name,
            "age": age,
            "country": country,
            "avatar": image,
            "gender": gender,
            "phone": phone,
            "email": email
        }

        const author = new AuthorModel(newAuthor);
        const response = await author.save();
        res.send({ "message": `Successfully created! ${response}` });
    } catch (err) {
        res.send({ "Error": "This is some error" });
    }
});

// Update an author by ID
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, age, country, avatar, gender, phone, email } = req.body;
        const newAuthor =
        {
            "name": name,
            "age": age,
            "country": country,
            "avatar": image,
            "gender": gender,
            "phone": phone,
            "email": email
        }
        const response = await AuthorModel.findByIdAndUpdate(
            id,
            { $set: newAuthor },
            { new: true, runValidators: true });
        res.send({ "message": `Successfully updated! ${response}` });
    } catch (err) {
        res.send({ "Error": "This is some error" });
    }
});

// Delete an author by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await AuthorModel.findByIdAndDelete(id);
        res.send({ "message": `Successfully deleted! ${response}` });
    } catch (err) {
        res.send({ "Error": "This is some error" });
    }
});

module.exports = router;
