const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isFinal: {
    type: Boolean,
  },
  finalRestaurants: [
    {
      name: {
        type: String,
      },
      coordinates: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
      url: {
        type: String,
      },
      location: {
        display_address: [
          {
            type: String,
          },
        ],
      },
      price: {
        type: String,
      },
      rating: {
        type: Number,
      },
    },
  ],
  restaurant_idx: {
    type: Number,
  },
  final_cravings: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Group", groupSchema);
