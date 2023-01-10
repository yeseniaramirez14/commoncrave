const dotenv = require("dotenv");
dotenv.config()

const sdk  = require('api')('@yelp-developers/v1.0#2hsur2ylbank95o')

sdk.auth(`Bearer ${process.env.yelp_API_Key}`)

// need zipcode and name
function get_alias_from_restuarant(zip_code, restaurant_name){
    let formatted_restaurant_name = restaurant_name.replace(/ /g, "%20")
    sdk.v3_business_search({location: String(zip_code), term: formatted_restaurant_name, sort_by: 'best_match', limit: '20'})
    .then(({ data }) => console.log(data))
    .catch(err => console.log(err));

    let alias = data['businesses'][0]['categories']
    let output = []
    for (alia of alias){
        output.push(alia['alias'])
    }
    return output
}