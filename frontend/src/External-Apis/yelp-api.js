import sdk from "api";
const dotenv = require("dotenv");
dotenv.config();

const get_alias_from_restaurant = async (lat, lon, restaurant_name) => {
  sdk("@yelp-developers/v1.0#2hsur2ylbank95o").auth(
    `Bearer ${process.env.YELP_API_KEY}`
  );
  let formatted_restaurant_name = restaurant_name.replace(/ /g, "%20");
  sdk
    .v3_business_search({
      latitude: String(lat),
      longitude: String(lon),
      term: formatted_restaurant_name,
      sort_by: "best_match",
      limit: "20",
    })
    .then(({ data }) => {
      let alias = data["businesses"][0]["categories"];
      let output = [];
      for (let alia of alias) {
        output.push(alia["alias"]);
      }
      return output;
    })
    .catch((err) => console.log(err));
};

export default get_alias_from_restaurant;
