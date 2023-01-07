const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cravingSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Craving', cravingSchema)