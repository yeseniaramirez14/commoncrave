import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";
import GoogleMapComponent from "../Components/GoogleMapComponent";
import cravingsData from "../cravingsData.json";

const GroupResult = () => {
  const [nothing, setNothing] = useState(0);
  const { id } = useParams();
  const [finalGroup, setFinalGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const isNewGroup = useSelector((state) => state.home.isNewGroup);

  useEffect(() => {
    const interval = setInterval(() => {
      getFinalRestaurants();
      setLoading(false);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getFinalRestaurants = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/group/${id}`
    );
    if (!data.ok) {
      throw new Error("could not fetch restaurant from group");
    }
    let group = await data.json();
    setFinalGroup(group.group);
  };

  const tryAgainOnClick = async () => {
    let currentidx = finalGroup.restaurant_idx;

    if (currentidx > finalGroup.finalRestaurants.length - 2) {
      currentidx = -1;
    }
    const data = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/updateidx/${id}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idx: currentidx + 1 }),
      }
    );
    if (!data) {
      throw new Error("Could not update idx");
    } else {
      getFinalRestaurants();
      setNothing(nothing + 1);
    }
  };

  useEffect(() => {}, [nothing]);

  if (!finalGroup) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-yellow">
        <PacmanLoader color={"#41584B"} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-yellow">
        <div className="mt-5 h-20 flex flex-row text-green items-center text-3xl font-semibold">
          The Common Crave
          {finalGroup.final_cravings.length === 1 ? ` is...` : "s are "}
        </div>
        <div className="mb-5 grid grid-cols-3 place-items-center text-3xl font-bold">
          {finalGroup.final_cravings.length === 1
            ? `${finalGroup.final_cravings[0]}`
            : finalGroup.final_cravings.map((craving, index) => {
                return (
                  <span key={index}>
                    {cravingsData[craving]}
                    {index < finalGroup.final_cravings.length - 1
                      ? ",\u00A0"
                      : " "}
                  </span>
                );
              })}
        </div>
        <GoogleMapComponent
          lat={
            finalGroup.finalRestaurants[finalGroup.restaurant_idx][
              "coordinates"
            ]["latitude"]
          }
          lon={
            finalGroup.finalRestaurants[finalGroup.restaurant_idx][
              "coordinates"
            ]["longitude"]
          }
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="mt-5 h-5 text-green flex flex-row items-center text-3xl font-semibold">
          We recommend to visit:
        </div>
        <div className="m-5 h-10 flex flex-row items-center">
          <a
            href={`${
              finalGroup.finalRestaurants[finalGroup.restaurant_idx]["url"]
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-3xl font-bold text-center">
              {finalGroup.finalRestaurants[finalGroup.restaurant_idx]["name"]}
            </p>
            <p className="text-sm text-green text-center">
              (Click to navigate to{" "}
              {finalGroup.finalRestaurants[finalGroup.restaurant_idx]["name"]}'s
              Yelp page!)
            </p>
          </a>
        </div>
        {isNewGroup ? (
          <button
            onClick={tryAgainOnClick}
            className="w-50 mb-10 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center"
          >
            Try Again
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default GroupResult;
