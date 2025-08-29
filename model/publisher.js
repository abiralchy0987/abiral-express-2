const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    name: String,
    address: String,
    isActive: Boolean
});

const PublisherModel = mongoose.model("publisher", publisherSchema);

module.exports = PublisherModel;
