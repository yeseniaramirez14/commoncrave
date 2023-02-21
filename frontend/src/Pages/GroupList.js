import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

const GroupList = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const getUsers = async () =>{
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/group/${id}/users`,
    )
    if (!res.ok) {
      throw new Error("Could not fetch all users");
    }
    let data = await res.json();
    setUsers(data.users)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getUsers()
      setLoading(false)
    },5000)
    return () => {
      // clears interval before running new effect
      clearInterval(interval)
    }
  },[]);

 // for testing we're using group 63e6d45c982202426c98cc09

  return(
    <>
      <div> {loading ? "loading": "done loading"}</div>
      <div>You have successfully created/joined a group {id}</div>;
      <div>
        <h1>Add friends to your group!</h1>
        Unique url link here
        {`${process.env.REACT_APP_API_HOST}/joingroup/${id}`}
      </div>
      <div>
        <h1>Friends that have joined</h1>
        {users.map(user => {
          return (
            <p>{users.indexOf(user)+1}. { user.name }</p>
          )
        })}
      </div>
      <button>Get Results</button>
    </>
    )
};

export default GroupList;
