import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsNewGroupTrue, setIsNewGroupFalse } from "../Redux/homeSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // need to add link to form while passing in newGroup or joinGroup variables so that form can change based on values passed in
  function clickNewGroup() {
    dispatch(setIsNewGroupTrue());
    navigate("/group");
  }

  function clickJoinGroup() {
    dispatch(setIsNewGroupFalse());
    navigate("/group");
  }

  return (
    <div className="h-screen flex-col items-center font-worksans bg-yellow">
      <div className="flex justify-center items-end h-1/2">
        <h1 className="text-center font-bold text-green text-3xl">I am...</h1>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={clickNewGroup}
          className="w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center"
        >
          <span className="mx-auto">Starting a Group</span>
        </button>
        <button
          onClick={clickJoinGroup}
          className="w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center"
        >
          <span className="mx-auto">Joining a Group</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
