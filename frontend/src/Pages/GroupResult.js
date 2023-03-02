import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";


const GroupResult = () => {
    const { id } = useParams();
    const [groupCraving, setGroupCraving] = useState([]);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [avgLat, setAvgLat] = useState(0)
    const [avgLon, setAvgLon] = useState(0)
    const [restaurants, setRestaurants] = useState([])
    const fetchedRef = useRef(false)


    useEffect(() => {
        // make sure useEffect only runs once on page load
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        getGroupInfo()
        setLoading(false)
    },[])


  // Get every craving from each user, create a dictionary that counts each instance, get max
  // if there is a tie, create an array of tied cravings, use randomint between 0-array.length-1
    const getGroupInfo = async () => {
        // fetch to get all users of specific group
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/group/${id}/users`)
        if (!res.ok) {
            throw new Error("Could not fetch all users");
        }
        let data = await res.json();
        
        setUsers(data.users);
        
        // get average lat/lon of all users
        let cravingsDict = {}
        let latSum = 0
        let lonSum = 0
        let totalUsers = data.users.length
        for (let user of data.users) {
            latSum += user.lat
            lonSum += user.lon
            let userCravings = user.cravings
            for (let craving of userCravings) {
                if (craving in cravingsDict) {
                    cravingsDict[craving] ++
                } else {
                    cravingsDict[craving] = 1
                }
            }
        }
        let tempLat = latSum/totalUsers
        let tempLon = lonSum/totalUsers
        setAvgLat(latSum/totalUsers)
        setAvgLon(lonSum/totalUsers)
        let finalcravings = finalCategory(cravingsDict)

        getRestaurantFromInfo(tempLat, tempLon, finalcravings)
    }
    
    // using groupCraving and average lat/lon, make API call to yelpAPI to get the list of restaurants
    const getRestaurantFromInfo = async (lati,long,cat) => {
        console.log(lati, long, cat)
        const data = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/alias_to_restaurant`,
            {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    lat: lati, 
                    lon: long, 
                    category: cat 
                }),
              }
        )
        if (!data.ok) {
            throw new Error("Could not get restuarant from info")
        }
        let restaurantInfo = await data.json();

        console.log("rest info ", restaurantInfo.data.businesses)
        setRestaurants(restaurantInfo.data.businesses)
    }
    
    function finalCategory(alias_dictionary) {
        let maxCount = 0;
        let maxAliases = [];
        for (let alias in alias_dictionary) {
          if (alias_dictionary[alias] > maxCount) {
            maxCount = alias_dictionary[alias];
            maxAliases = [alias];
          } else if (alias_dictionary[alias] === maxCount) {
            maxAliases.push(alias);
          }
        }
        return maxAliases
      };




  // create a function for the try again and put it in a useEffect that sets the restaurant name and location for the google pin
  return (
    <>
        {loading ? (
            <div className="flex items-center justify-center h-screen bg-yellow">
                <PacmanLoader />
            </div>
        ) : (
            <div>
                {users.map((user) => {
                    return (
                        <p key={users.indexOf(user) + 1}>
                        {users.indexOf(user) + 1}. {user.name} + {user.cravings}
                        </p>
                    );
                    })}
            <div>
                The Common Crave is... {groupCraving}
            </div>
            <div>
                We recommend to visit: {restaurants.map((restaurant) => {
                    return (
                        <p key={restaurant.id}>{restaurant.name}</p>
                    )
                })}
            </div>
            </div>
        )}
    </>
    );
};

export default GroupResult;
