const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/book');
const genreRoutes = require("./routes/genre");
const publisherRoutes = require("./routes/publisher");
const authorRoutes = require("./routes/author");




const app = express();

app.use(cors());
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/mern')
    .then(() => {
        console.log('Connected with mongodb!')
        
        app.listen(8000, () => {
            console.log("Listening at port 8000")
        })
    })
    .catch(error => console.log(error));

app.use("/books", bookRoutes);
app.use("/genres", genreRoutes);
app.use("/publishers", publisherRoutes);
app.use("/authors", authorRoutes);