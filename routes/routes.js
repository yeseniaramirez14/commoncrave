const express = require("express");
const router = express.Router();
const cors = require("cors");

const User = require("../collections/user");
const Group = require("../collections/group");
const { getLatLongFromAddress } = require("../external-apis/geocoder");
const { get_alias_from_restaurant, search_business_by_alias } = require("../external-apis/yelp_api");

// Create User (POST)
router.post("/user", async (req, res) => {
  try {
    const data = new User({
      name: req.body.name,
      lat: req.body.lat,
      lon: req.body.lon,
      cravings: req.body.cravings,
    });

    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Users
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
    return users;
  } catch (error) {
    res.status(400).jason({ message: error.message });
  }
});

// Create Group (POST)
router.post("/group", async (req, res) => {
  const user = await User.findById(req.body.owner_id).exec();

  console.log("user:", user);

  const data = new Group({
    name: req.body.name,
    owner_id: user._id,
    members: user,
    isFinal: false,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Get all groups
router.get("/group", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json({ groups: groups });
    return groups;
  } catch (error) {
    res.status(400).jason({ message: error.message });
  }
});

// Get Group by ID (GET)
router.get("/group/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).exec();
    res.status(200).json({ group: group });
    return group;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Users in a Group
router.get("/group/:id/users", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).exec();
    let users = [];
    for (let member of group.members) {
      let user = await User.findById(member).exec();
      users.push(user);
    }
    res.status(200).json({ users: users });
    return users;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Group by ID (PUT)
router.put("/group/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          members: req.body.members,
        },
      },
      { returnDocument: "after", runValidators: true }
    );
    res.status(200).json({ group: group });
    return group;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Finalize Group (PUT)
router.put("/finalize_group/:id", async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      { _id: req.params.id },
      {
        isFinal: true,
      },
      { returnDocument: "after", runValidators: true }
    );
    res.status(200).json({ group: group });
    return group;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Group by ID (DEL)
router.delete("/group/:id", async (req, res) => {
  try {
    await Group.deleteOne({ _id: ObjectId(`${req.params.id}`) });
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete User by ID (DEL)
router.delete("/user/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: ObjectId(`${req.params.id}`) });
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// takes latitude, longitude, and a restaurant name and returns the alias's
// of that restaurant
router.post("/restaurant_to_alias", async (req, res) => {
  try {
    const alias = await get_alias_from_restaurant(
      req.body.lat,
      req.body.lon,
      req.body.restaurant_name
    );
    res.status(200).json({ alias: alias });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/address_to_latlon", async (req, res) => {
  try {
    const [lat, lon] = await getLatLongFromAddress(req.body.address);
    res.status(200).json({ coords: [lat, lon] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// takes lat, lon, and alias to return a list of restaurants around the area
router.post("/alias_to_restaurant", async (req, res) => {
  try {
    const data = await search_business_by_alias(
      req.body.lat,
      req.body.lon,
      req.body.category
    );
    res.status(200).json({data: data});
  } catch(error) {
    res.status(400).json({message: error.message});
  }
})

module.exports = router;
