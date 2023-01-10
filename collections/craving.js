const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cravingSchema = new Schema(
    {
        owner_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        {
            name: {
                type: String,
                required: true
            },
            count {
                type: Number,
                required: true
            }
        }
    }
);

module.exports = mongoose.model('Craving', cravingSchema)