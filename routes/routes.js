const express = require('express');

const router = express.Router();

const User = require('../collections/user');
const Group = require('../collections/group');
const {getLatLongFromAddress} = require('../external-apis/geocoder');

// Create User (POST)
router.post('/user', async (req, res) => {
    try {
        const [lat, lon] = await getLatLongFromAddress(req.body.address)
    
        const data = new User({
            name: req.body.name,
            lat: lat,
            lon: lon,
            cravings: req.body.cravings
        })

        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

// Get all Users
router.get('/user', async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({users: users})
        return users
    } catch(error){
        res.status(400).jason({message: error.message})
    }
})

// Create Group (POST)
router.post('/group', async (req, res) => {
    const user = await User.findById(req.body.owner_id).exec();

    console.log("user:", user)

    const data = new Group({
        name: req.body.name,
        owner_id: user._id,
        members: user,
    }) 

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})
// Get all groups
router.get('/group', async (req, res) => {
    try{
        const groups = await Group.find()
        res.status(200).json({groups: groups})
        return groups
    } catch(error){
        res.status(400).jason({message: error.message})
    }
})

// Get Group by ID (GET)
router.get('/group/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).exec();
        res.status(200).json({group: group})
        return group
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

// Update Group by ID (PUT)
router.patch('/group/:id', async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(
            {_id: req.params.id},
            { $push:   {
                members: req.body.members
            }},
            {returnDocument: "after", runValidators: true}
        )
        res.status(200).json({group: group})
        return group
    } catch(error) {
        res.status(400).json({message: error.message})
    }
})

// Delete Group by ID (DEL)
router.delete('/group/:id', async (req, res) => {
    try {
        await Group.deleteOne(
            {"_id": ObjectId(`${req.params.id}`)}
        )
        res.status(200).json({message: 'successfully deleted'})
    } catch(error) {
        res.status(400).json({message:error.message})
    }
})

// Delete User by ID (DEL)
router.delete('/user/:id', async (req, res) => {
    try {
        await User.deleteOne(
            {"_id": ObjectId(`${req.params.id}`)}
        )
        res.status(200).json({message: 'successfully deleted'})
    } catch(error) {
        res.status(400).json({message:error.message})
    }
})

module.exports = router;