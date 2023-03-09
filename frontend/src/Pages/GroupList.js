import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";
import copyIcon from "../images/icons/copyIcon.png";

const GroupList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    if (data.isFinal === true) {
      navigate(`/group/${id}/results`);
    }
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
    return maxAliases;
  }

  const getRestaurantFromInfo = async (lat, lon, categories) => {
    const data = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/alias_to_restaurant`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: lat,
          lon: lon,
          category: categories,
        }),
      }
    );
    if (!data.ok) {
      throw new Error("Could not get restaurant from lat/lon/categories");
    }
    let restaurantInfo = await data.json();
    let filtered_restuarant_data = restaurantInfo.data.businesses.map(
      (obj) => ({
        name: obj.name,
        coordinates: {
          latitude: obj.coordinates.latitude,
          longitude: obj.coordinates.longitude,
        },
        url: obj.url,
        location: {
          display_address: obj.location.display_address,
        },
        price: obj.price,
        rating: obj.rating,
      })
    );
    return filtered_restuarant_data;
  };

  const getResultsOnClick = async () => {
    // assemble group info
    let cravingsDict = {};
    let latSum = 0;
    let lonSum = 0;
    let totalUsers = users.length;
    for (let user of users) {
      latSum += user.lat;
      lonSum += user.lon;
      let userCravings = user.cravings;
      for (let craving of userCravings) {
        if (craving in cravingsDict) {
          cravingsDict[craving]++;
        } else {
          cravingsDict[craving] = 1;
        }
      }
    }
    let avgLat = latSum / totalUsers;
    let avgLon = lonSum / totalUsers;
    let finalCravings = finalCategory(cravingsDict);

    // make api call to yelp and get back list of 7 restaurant objects
    let restaurants_from_yelp = await getRestaurantFromInfo(
      avgLat,
      avgLon,
      finalCravings
    );

    // make api call to Mongo and save the 7 restaurant objects
    // and api call to set isFinal to true
    const restaurantsToMongo = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/finalize_restaurants/${id}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          finalRestaurants: restaurants_from_yelp,
          finalCravings: finalCravings,
        }),
      }
    );
    if (!restaurantsToMongo) {
      throw new Error("Could not add final restaurants to group DB");
    } else {
      // navigate to GroupResult
      navigate(`/group/${id}/results`);
    }
  };

  // for testing we're using group 63e6d45c982202426c98cc09

  return (
    <>
      <div>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen bg-yellow">
            <PacmanLoader color={"#41584B"} />
          </div>
        ) : (
          <>
            <div className="min-h-screen flex flex-col items-center font-worksans bg-yellow">
              {isNewGroup ? (
                <div className="text-2xl text-green mt-5 h-10 flex flex-row items-center text-center">
                  {" "}
                  You have successfully created a new group!
                </div>
              ) : (
                <div className="text-2xl text-green mt-5 h-10 flex flex-row items-center text-center">
                  You have successfully joined group {id}
                </div>
              )}
              <div className="flex flex-col items-center justify-center mt-5">
                <h1 className="text-3xl font-bold text-center">
                  Add friends to your group!
                </h1>
                <div className="flex flex-row border border-green rounded-lg mt-5">
                  <button
                    className="bg-green rounded-l-lg"
                    onClick={() => copyText()}
                  >
                    <img
                      className="scale-50 bg-green"
                      src={copyIcon}
                      alt="copy text"
                    />
                  </button>
                  <input
                    type="text"
                    className="w-80 text-green rounded-r-lg"
                    value={`${process.env.REACT_APP_HOST}/joingroup/${id}`}
                  ></input>
                </div>
              </div>
              <div className="mt-20 border rounded-lg bg-white w-1/2 h-1/2 flex flex-col items-center">
                <h1 className="text-3xl font-semibold m-5">
                  Friends that have joined
                </h1>
                {users.map((user) => {
                  return (
                    <p
                      key={users.indexOf(user) + 1}
                      className="text-xl font-normal text-green"
                    >
                      {users.indexOf(user) + 1}. {user.name}
                    </p>
                  );
                })}
              </div>
              {!isNewGroup ? (
                <div className="m-20 text-2xl">
                  {" "}
                  Waiting on group leader to get results{" "}
                </div>
              ) : (
                <button
                  onClick={() => getResultsOnClick()}
                  className="m-20 w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center"
                >
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
