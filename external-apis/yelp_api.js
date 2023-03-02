const dotenv = require("dotenv");
dotenv.config();

const sdk = require("api")("@yelp-developers/v1.0#2hsur2ylbank95o");

sdk.auth(`Bearer ${process.env.YELP_API_KEY}`);

module.exports = {
  // takes latitude, longitude, and a restaurant name and returns the alias's
  // of that restaurant

  get_alias_from_restaurant: async (lat, lon, restaurant_name) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    };
    try {
      let formatted_restaurant_name = restaurant_name.replace(/ /g, "%20");
      let res = await fetch(
        `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&term=${formatted_restaurant_name}&sort_by=best_match&limit=20`,
        options
      );
      let data = await res.json();
      let output = [];
      let alias = data["businesses"][0]["categories"];
      for (let alia of alias) {
        output.push(alia["alias"]);
      }
      return output;
    } catch (error) {
      console.error(err);
    }
  },

  // takes latitude, longitude, and an alias to search for
  // restuarants within a 5 mile radius
  search_business_by_alias: async (lat, lon, category) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    };
    try{
      let res = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&categories=${category}&sort_by=best_match&limit=7`, options)
      let data = await res.json();
      return data
    } catch (error) {
      console.error(err)
    }
  },
};

// get_alias_from_restuarant(91748, 'Myungrang')
// search_business_by_alias(33.9565899, -117.9110073, "japanese");
