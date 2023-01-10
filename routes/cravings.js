const express = require('express');

const craving_router = express.Router();

const Cravings = require('../collections/craving');

craving_router.post('/cravings', async (req, res) => {
    try {
        await Cravings.insertMany( [
            {name: "Mexican"},
            {name: "Italian"},
            {name: "Japanese"},
            {name: "Chinese"}
        ]);
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = craving_router