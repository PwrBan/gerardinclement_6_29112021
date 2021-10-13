const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
    sauce: {type: String, required: true},
    image: {type: String, required: true}
});

module.exports = mongoose.model('Sauces', sauceSchema)