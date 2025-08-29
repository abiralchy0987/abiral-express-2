const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = new Schema({
    name: String,
    age: Number,
    country: String,

    avatar: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    phone: String,
    email: String,
    
});

const AuthorModel = mongoose.model('Author', authorSchema);
module.exports = AuthorModel;
