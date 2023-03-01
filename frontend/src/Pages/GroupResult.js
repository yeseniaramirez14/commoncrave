import { useState } from "react";

const GroupResult = () => {
  const [groupCraving, setGroupCraving] = useState("");
  // Get every craving from each user, create a dictionary that counts each instance, get max
  // if there is a tie, create an array of tied cravings, use randomint between 0-array.length-1

  // get average lat/lon of all users

  // using groupCraving and average lat/lon, make API call to yelpAPI to get the list of restaurants

  // create a function for the try again and put it in a useEffect that sets the restaurant name and location for the google pin
  return <>Group Result</>;
};

export default GroupResult;
