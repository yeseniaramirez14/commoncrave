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
              <h1 className="text-3xl font-bold">Add friends to your group!</h1>
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
            { isNewGroup ? (
              <div> Waiting on group leader to get results </div>
            ) : (
              <button className ="w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center">
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
