const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  // Get lat/lon coordinates from address
  getLatLongFromAddress: async (address) => {
    const options = {
      provider: "google",
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    };

    const geocoder = NodeGeocoder(options);

    const res = await geocoder.geocode(address);
    const lat = res[0]["latitude"];
    const lon = res[0]["longitude"];
    // return res
    return [lat, lon];
  },

  // get equidistant lat/lon
  // input: [[123,13],[133,232]]
  // output: [1132,12]
  get_average_lat_lon: (coordinates) => {
    let total_coordinates = coordinates.length;
    let total_lat = 0;
    let total_lon = 0;

    if (total_coordinates == 0) {
      return null;
    } else if (total_coordinates == 1) {
      return coordinates[0];
    }

    for (let coordinate of coordinates) {
      total_lat += coordinate[0];
      total_lon += coordinate[1];
    }

    const lat_avg = total_lat / total_coordinates;
    const lon_avg = total_lon / total_coordinates;

    return [lat_avg, lon_avg];
  },
};

// .log("where are we going to meet up", get_average_lat_lon([[33.9565899, -117.9110073], [30.1457001, -97.79002369999999]]))
