const dotenv = require("dotenv");
dotenv.config()

const sdk  = require('api')('@yelp-developers/v1.0#2hsur2ylbank95o')

sdk.auth(`Bearer ${process.env.yelp_API_Key}`)

function get_alias_from_restuarant(restaurant_name){
    
}