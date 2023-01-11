const express = require('express');

const router = express.Router();

const User = require('../collections/user');
const Group = require('../collections/group');

// Create User (POST)
router.post('/user', async (req, res) => {
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
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

// router.post('/cravings', async (req, res) => {
//     try {
//         console.log("inside and about to start")
//         const cravings = await Craving.insertMany( [
//             {name: "Mexican"},
//             {name: "Italian"},
//             {name: "Japanese"},
//             {name: "Chinese"}
//         ]);
//         console.log("done")
//         return cravings
//     } catch(error) {
//         res.status(400).json({message: error.message})
//     }
// })

module.exports = router;