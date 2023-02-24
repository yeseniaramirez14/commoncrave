import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader"

const GroupList = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const isNewGroup = useSelector((state) => state.home.isNewGroup);

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

  function copyText() {
    navigator.clipboard.writeText(`${process.env.REACT_APP_HOST}/joingroup/${id}`)
  }

 // for testing we're using group 63e6d45c982202426c98cc09

  return(
    <>
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <PacmanLoader />
        </div>
        ) : (
          <>
            {isNewGroup ? <div> You have successfully created a new group!</div>:<div>You have successfully joined group {id}</div>}
            <div>
              <h1>Add friends to your group!</h1>
              <div>
                <button onClick={()=> copyText()}>copy icon</button>
                <input type="text" value={`${process.env.REACT_APP_HOST}/joingroup/${id}`}></input>
              </div>
              
            </div>
            <div>
              <h1>Friends that have joined</h1>
              {users.map(user => {
                return (
                  <p key={users.indexOf(user)+1}>{users.indexOf(user)+1}. { user.name }</p>
                  )
                })}
            </div>
            <button>Get Results</button>
          </>
          )}
    </div>
    </>
    )
};

export default GroupList;
