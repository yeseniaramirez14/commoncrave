const express = require('express');

const router = express.Router();

const User = require('../collections/user');
const Group = require('../collections/group');
const Craving = require('../collections/craving');

// Create User (POST)
router.post('/user', async (req, res) => {
    // const cravings = req.body.cravings
    // console.log("cravings", cravings)
    // for (let craving of cravings) {
    //     console.log("craving in for loop", craving)
    //     Craving.findOne
    // }


    const data = new User({
        name: req.body.name,
        zipcode: req.body.zipcode,
        cravings: req.body.cravings
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

// Create Group (POST)
router.post('/group', async (req, res) => {
    const user = await User.findById(req.body.owner_id).exec();

    // const cravings = user.cravings
    // console.log("cravings", cravings)
    // for (let craving of cravings) {
    //     console.log("craving in for loop", craving)
    // }
    // for (let i=0; i< cravings.length; i++ ) {

    //     const craving = await Craving.findById()
    // }

    console.log("user:", user)


    const data = new Group({
        name: req.body.name,
        owner_id: user._id,
        members: user,
        cravings: user.cravings
    }) 

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

// Get Group by ID (GET)
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

// Update Group by ID (PUT)
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

// Delete Group by ID (DEL)
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

router.post('/cravings', async (req, res) => {
    try {
        console.log("inside and about to start")
        const cravings = await Craving.insertMany( [
            {name: "Mexican"},
            {name: "Italian"},
            {name: "Japanese"},
            {name: "Chinese"}
        ]);
        console.log("done")
        return cravings
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})



module.exports = router;