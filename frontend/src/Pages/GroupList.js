import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";
import copyIcon from "../images/icons/copyIcon.png";

const GroupList = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isNewGroup = useSelector((state) => state.home.isNewGroup);

  const getUsers = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/group/${id}/users`
    );
    if (!res.ok) {
      throw new Error("Could not fetch all users");
    }
    let data = await res.json();
    setUsers(data.users);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getUsers();
      setLoading(false);
    }, 5000);
    return () => {
      // clears interval before running new effect
      clearInterval(interval);
    };
  }, []);

  function copyText() {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_HOST}/joingroup/${id}`
    );
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

  const getRestaurantFromInfo = async (lat, lon, categories) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/alias_to_restaurant`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
              lat: lat, 
              lon: lon, 
              category: categories 
          }),
        }
    );
    if (!data.ok) {
      throw new Error("Could not get restaurant from lat/lon/categories")
    }
    let restaurantInfo = await data.json();
    let filtered_restuarant_data = restaurantInfo.data.businesses.map(obj => (
      {
        name: obj.name, 
        coordinates: {
          latitude: obj.coordinates.latitude, 
          longitude: obj.coordinates.longitude
        }, 
        url: obj.url, 
        location: {
          display_address: obj.location.display_address
        }, 
        price: obj.price, 
        rating: obj.rating
      }
      ))
    return filtered_restuarant_data
  }

  const getResultsOnClick = async () => {
    // assemble group info
    let cravingsDict = {}
    let latSum = 0
    let lonSum = 0
    let totalUsers = users.length
    for (let user of users){
      latSum += user.lat 
      lonSum += user.lon 
      let userCravings = user.cravings 
      for(let craving of userCravings){
        if (craving in cravingsDict) {
          cravingsDict[craving] ++
        } else {
          cravingsDict[craving] = 1
        }
      };
    };
    let avgLat = latSum/totalUsers
    let avgLon = lonSum/totalUsers
    let finalCravings = finalCategory(cravingsDict)

    // make api call to yelp and get back list of 7 restaurant objects
    let restaurants_from_yelp = await getRestaurantFromInfo(avgLat,avgLon,finalCravings)
    console.log("here", restaurants_from_yelp)
    // make api call to Mongo and save the 7 restaurant objects

    // api call to set isFinal to true

    // navigate to GroupResult
  }

  // for testing we're using group 63e6d45c982202426c98cc09

  return (
    <>
      <div>
        {loading ? (
          <div className="flex items-center justify-center h-screen bg-yellow">
            <PacmanLoader />
          </div>
        ) : (
          <>
            <div className="h-screen flex flex-col items-center font-worksans bg-yellow">
              {isNewGroup ? (
                <div> You have successfully created a new group!</div>
              ) : (
                <div>You have successfully joined group {id}</div>
              )}
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">
                  Add friends to your group!
                </h1>
                <div className="flex flex-row">
                  <button onClick={() => copyText()}>
                    <img className="scale-50" src={copyIcon} alt="copy text" />
                  </button>
                  <input
                    type="text"
                    value={`${process.env.REACT_APP_HOST}/joingroup/${id}`}
                  ></input>
                </div>
              </div>
              <div>
                <h1>Friends that have joined</h1>
                {users.map((user) => {
                  return (
                    <p key={users.indexOf(user) + 1}>
                      {users.indexOf(user) + 1}. {user.name}
                    </p>
                  );
                })}
              </div>
              {/* add !isNewGroup */}
              {console.log("clear me when done bottom on grouplist")}
              {isNewGroup ? (
                <div> Waiting on group leader to get results </div>
              ) : (
                <button onClick={()=>getResultsOnClick()} className="w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center">
                  Get Results
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GroupList;
