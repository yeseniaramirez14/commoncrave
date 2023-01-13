const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        },
        cravings: [{
            type: String,
            required: true
        }]
    }
);

module.exports = mongoose.model('User', userSchema);