const dotenv = require("dotenv");
dotenv.config();

const sdk = require("api")("@yelp-developers/v1.0#2hsur2ylbank95o");

sdk.auth(`Bearer ${process.env.YELP_API_KEY}`);

module.exports = {
  // takes latitude, longitude, and a restaurant name and returns the alias's
  // of that restaurant
  get_alias_from_restuarant: (lat, lon, restaurant_name) => {
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
        console.log("output", output);
        return output;
      })
      .catch((err) => console.log(err));
  },

  // takes latitude, longitude, and an alias to search for
  // restuarants within a 5 mile radius
  search_business_by_alias: (lat, lon, category) => {
    sdk
      .v3_business_search({
        latitude: String(lat),
        longitude: String(lon),
        radius: "8000",
        categories: category,
        sort_by: "best_match",
        limit: "7",
      })
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((err) => console.error(err));
  },
};

// get_alias_from_restuarant(91748, 'Myungrang')
search_business_by_alias(33.9565899, -117.9110073, "japanese");
