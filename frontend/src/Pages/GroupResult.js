import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

const GroupResult = () => {
    const { id } = useParams();
  const [groupCraving, setGroupCraving] = useState("");
    const [cravingsDict, setCravingsDict] = useState({})
    const [users, setUsers] = useState([])


    useEffect(() => {
        getAllUserCravings()
    },[])


  // Get every craving from each user, create a dictionary that counts each instance, get max
  // if there is a tie, create an array of tied cravings, use randomint between 0-array.length-1
    const getAllUserCravings = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/group/${id}/users`)
        if (!res.ok) {
            throw new Error("Could not fetch all users");
          }
        let data = await res.json();
        setUsers(data.users);
        for (let user of users) {
            let userCravings = user.cravings
            for (let craving of userCravings) {
                if (craving in cravingsDict) {
                    cravingsDict[craving] ++
                } else {
                    cravingsDict[craving] = 1
                }
            }
        }
        console.log(cravingsDict)
    }

  // get average lat/lon of all users

  // using groupCraving and average lat/lon, make API call to yelpAPI to get the list of restaurants

  // create a function for the try again and put it in a useEffect that sets the restaurant name and location for the google pin
  return <>Group Result</>;
};

export default GroupResult;
