import { useParams } from "react-router-dom";

const GroupList = () => {

  const getUsers = async () =>{
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/user`,
    )
    if (!res.ok) {
      throw new Error("Could not fetch all users");
    }
    let data = await res.json();
    console.log("all users:", data)
  }

  getUsers()

  const { id } = useParams();
  return(
    <>
      <div>You have successfully created/joined a group {id}</div>;
      <button>Everyone's Here</button>
    </>
    )
};

export default GroupList;
